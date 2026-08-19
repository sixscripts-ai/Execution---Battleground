// Universal Multi-Model LLM Execution Engine
// Dynamically routes to DeepSeek Official, Groq LPU, Google Gemini, OpenAI, Anthropic, OpenRouter, Mistral, and Local Ollama

import { findModelInfo, LEADERBOARD_MODELS } from "../data/models";

export interface ApiKeysConfig {
  mode: "simulated" | "live";
  deepseekKey?: string;
  agentRouterKey?: string;
  agentRouterEndpoint?: string;
  groqKey?: string;
  geminiKey?: string;
  openaiKey?: string;
  anthropicKey?: string;
  openRouterKey?: string;
  mistralKey?: string;
  localEndpoint?: string;
}

const STORAGE_KEY = "agent_arena_api_keys";

export function loadApiKeys(): ApiKeysConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    mode: "live",
    deepseekKey: (import.meta as any).env?.VITE_DEEPSEEK_KEY || "",
    agentRouterKey: (import.meta as any).env?.VITE_AGENTROUTER_KEY || "",
    agentRouterEndpoint: (import.meta as any).env?.VITE_AGENTROUTER_ENDPOINT || "https://agentrouter.org/v1",
    groqKey: (import.meta as any).env?.VITE_GROQ_KEY || "",
    geminiKey: (import.meta as any).env?.VITE_GEMINI_KEY || "",
    openaiKey: (import.meta as any).env?.VITE_OPENAI_KEY || "",
    anthropicKey: (import.meta as any).env?.VITE_ANTHROPIC_KEY || "",
    openRouterKey: (import.meta as any).env?.VITE_OPENROUTER_KEY || "",
    localEndpoint: (import.meta as any).env?.VITE_LOCAL_ENDPOINT || "http://localhost:11434"
  };
}

export function saveApiKeys(config: ApiKeysConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export interface PromptAgentParams {
  modelId: string;
  role: string;
  formatName: string;
  phase: string;
  previousCode?: string;
  opponentCode?: string;
}

export async function generateAgentTurn(
  params: PromptAgentParams,
  config: ApiKeysConfig
): Promise<{ code: string; toolAction: string; toolTarget: string; detail: string; latencyMs: number }> {
  const start = performance.now();

  if (config.mode === "simulated") {
    return { code: "", toolAction: "", toolTarget: "", detail: "", latencyMs: 0 };
  }

  const modelInfo = findModelInfo(params.modelId);
  const isLocalOllama = params.modelId.startsWith("local-");
  const localModelName = isLocalOllama ? params.modelId.replace("local-", "") : "";

  const systemPrompt = `You are an elite autonomous AI agent competing in the Agent Arena ${params.formatName}.
Your assigned role is: ${params.role}.
Current Phase: ${params.phase}.
Task: Generate high quality, secure, production-grade TypeScript code for this phase.
Output format: Return ONLY executable TypeScript code without markdown formatting fences.`;

  const userPrompt = `Previous workspace code:\n${params.previousCode || "// No previous code"}\n\nOpponent's state:\n${params.opponentCode || "// Probing target"}\n\nEmit your implementation for ${params.phase}.`;

  // 1. Native DeepSeek Official API Execution (platform.deepseek.com)
  if (config.deepseekKey && (modelInfo.providerType === "deepseek" || params.modelId.includes("deepseek"))) {
    try {
      const targetModel = modelInfo.apiModelId || (params.role.includes("Builder") ? "deepseek-reasoner" : "deepseek-chat");
      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.deepseekKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        const choice = data.choices?.[0]?.message;
        const rawContent = choice?.content || choice?.reasoning_content || "";
        const cleaned = rawContent.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);

        if (cleaned) {
          return {
            code: cleaned,
            toolAction: params.role.includes("Builder") ? "DEEPSEEK_AST_PATCH" : "DEEPSEEK_EXPLOIT_PROBE",
            toolTarget: params.role.includes("Builder") ? "src/authMiddleware.ts" : "fuzzer/exploit_probe.ts",
            detail: `Live DeepSeek (${targetModel}) in ${elapsed}ms (~${data.usage?.total_tokens || 0} tokens).`,
            latencyMs: elapsed
          };
        }
      }
    } catch (e: any) {
      console.warn("DeepSeek native API call failed:", e.message);
    }
  }

  // 2. Local Ollama Routing
  if (isLocalOllama) {
    try {
      const endpoint = config.localEndpoint || "http://localhost:11434";
      const res = await fetch(`${endpoint}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: localModelName,
          system: systemPrompt,
          prompt: userPrompt,
          stream: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        const cleaned = (data.response || "").replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);
        if (cleaned) {
          return {
            code: cleaned,
            toolAction: params.role.includes("Builder") ? "OLLAMA_AST_PATCH" : "OLLAMA_EXPLOIT",
            toolTarget: params.role.includes("Builder") ? "src/authMiddleware.ts" : "fuzzer/exploit_probe.ts",
            detail: `Local Ollama (${localModelName}) generation in ${elapsed}ms.`,
            latencyMs: elapsed
          };
        }
      }
    } catch (e: any) {
      console.warn("Local Ollama execution failed:", e.message);
    }
  }

  // 3. Groq LPU Native Execution (Ultra-Fast Live Inference)
  if (config.groqKey && (modelInfo.providerType === "groq" || (!config.openRouterKey && !config.openaiKey && !config.deepseekKey))) {
    try {
      const groqTargetModel = modelInfo.providerType === "groq" 
        ? modelInfo.apiModelId 
        : params.role.includes("Builder") ? "openai/gpt-oss-120b" : "openai/gpt-oss-20b";

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: groqTargetModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 800,
          temperature: 0.2
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning || "";
        const cleanedCode = rawContent.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);

        if (cleanedCode) {
          return {
            code: cleanedCode,
            toolAction: params.role.includes("Builder") ? "GROQ_AST_PATCH" : "GROQ_EXPLOIT_FUZZ",
            toolTarget: params.role.includes("Builder") ? "src/authMiddleware.ts" : "fuzzer/exploit_probe.ts",
            detail: `Live Groq LPU (${groqTargetModel}) in ${elapsed}ms (~${data.usage?.total_tokens || 0} tokens).`,
            latencyMs: elapsed
          };
        }
      }
    } catch (err: any) {
      console.warn("Groq live call failed:", err.message);
    }
  }

  // 4. Google Gemini Native API Execution
  if (config.geminiKey && modelInfo.providerType === "gemini") {
    try {
      const geminiModel = modelInfo.apiModelId || "gemini-3.6-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${config.geminiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleaned = raw.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);
        if (cleaned) {
          return {
            code: cleaned,
            toolAction: params.role.includes("Builder") ? "GEMINI_AST_PATCH" : "GEMINI_FUZZ_PROBE",
            toolTarget: params.role.includes("Builder") ? "src/authMiddleware.ts" : "fuzzer/exploit_probe.ts",
            detail: `Live Google Gemini (${geminiModel}) in ${elapsed}ms.`,
            latencyMs: elapsed
          };
        }
      }
    } catch (e: any) {
      console.warn("Gemini call error:", e.message);
    }
  }

  // 5. OpenAI Direct API Execution
  if (config.openaiKey && modelInfo.providerType === "openai") {
    try {
      const targetModel = modelInfo.apiModelId || "gpt-4o";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 800
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content || "";
        const cleaned = rawContent.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);
        if (cleaned) {
          return {
            code: cleaned,
            toolAction: "OPENAI_PATCH",
            toolTarget: "src/authMiddleware.ts",
            detail: `Live OpenAI (${targetModel}) in ${elapsed}ms.`,
            latencyMs: elapsed
          };
        }
      }
    } catch (e: any) {
      console.warn("OpenAI API call failed:", e.message);
    }
  }

  // 6. AgentRouter Non-Profit Gateway Execution (agentrouter.org)
  if (config.agentRouterKey && (modelInfo.providerType === "agentrouter" || params.modelId.startsWith("ar-"))) {
    try {
      const endpoint = config.agentRouterEndpoint || "https://agentrouter.org/v1";
      const targetModel = modelInfo.apiModelId || (params.modelId.startsWith("ar-") ? params.modelId.replace("ar-", "") : params.modelId);
      const res = await fetch(`${endpoint}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.agentRouterKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        const choice = data.choices?.[0]?.message;
        const rawContent = choice?.content || choice?.reasoning_content || "";
        const cleaned = rawContent.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);
        if (cleaned) {
          return {
            code: cleaned,
            toolAction: params.role.includes("Builder") ? "AGENTROUTER_AST_PATCH" : "AGENTROUTER_EXPLOIT",
            toolTarget: params.role.includes("Builder") ? "src/authMiddleware.ts" : "fuzzer/exploit_probe.ts",
            detail: `Live AgentRouter (${targetModel}) in ${elapsed}ms (~${data.usage?.total_tokens || 0} tokens).`,
            latencyMs: elapsed
          };
        }
      }
    } catch (err: any) {
      console.warn("AgentRouter API call failed:", err.message);
    }
  }

  // 7. OpenRouter Universal Routing (Supports DeepSeek, Claude, Meta, Qwen, Mistral)
  if (config.openRouterKey) {
    try {
      const targetModel = modelInfo.apiModelId || params.modelId;
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://agent-arena.local",
          "X-Title": "Agent Arena"
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 800
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content || "";
        const cleaned = rawContent.replace(/^```(typescript|ts|javascript|js)?\n/i, "").replace(/```$/i, "").trim();
        const elapsed = Math.round(performance.now() - start);
        if (cleaned) {
          return {
            code: cleaned,
            toolAction: "OPENROUTER_PATCH",
            toolTarget: "src/authMiddleware.ts",
            detail: `Live OpenRouter (${targetModel}) in ${elapsed}ms.`,
            latencyMs: elapsed
          };
        }
      }
    } catch (err: any) {
      console.warn("OpenRouter API call failed:", err.message);
    }
  }

  return { code: "", toolAction: "", toolTarget: "", detail: "", latencyMs: 0 };
}
