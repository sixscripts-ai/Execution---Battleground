// Local Ollama Auto-Discovery & Inference Service

export interface LocalOllamaModel {
  name: string;
  model: string;
  size: number;
  digest: string;
  modified_at: string;
}

export async function checkOllamaStatus(endpoint = "http://localhost:11434"): Promise<{
  isOnline: boolean;
  models: LocalOllamaModel[];
  error?: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(`${endpoint}/api/tags`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        isOnline: true,
        models: data.models || []
      };
    }
    return { isOnline: false, models: [] };
  } catch (err: any) {
    return { isOnline: false, models: [], error: err.message };
  }
}

export async function promptLocalOllama(
  model: string,
  prompt: string,
  systemPrompt?: string,
  endpoint = "http://localhost:11434"
): Promise<{ response: string; latencyMs: number }> {
  const start = performance.now();
  try {
    const res = await fetch(`${endpoint}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        system: systemPrompt,
        stream: false
      })
    });

    if (!res.ok) throw new Error(`Ollama error: ${res.statusText}`);
    const data = await res.json();
    return {
      response: data.response || "",
      latencyMs: Math.round(performance.now() - start)
    };
  } catch (err: any) {
    return {
      response: "",
      latencyMs: Math.round(performance.now() - start)
    };
  }
}
