import { LEADERBOARD_MODELS } from "../data/models";

export interface BattleToolCall {
  t: number;
  kind: "action_log" | "transcript" | "artifact";
  model_id: string;
  phase: string;
  action: string;
  target: string;
  state: "ok" | "failed" | "running";
  duration: string;
  detail: string;
}

export interface AgentBattleState {
  id: string;
  name: string;
  role: string;
  elo: number;
  deltaElo: number;
  score: number;
  tokensPerSec: string;
  status: "idle" | "running" | "done";
  currentCode: string;
  files: Record<string, string>;
  toolCalls: BattleToolCall[];
  transcripts: string[];
  versions: {
    version: number;
    phase: string;
    timestamp: string;
    summary: string;
    code: string;
  }[];
}

export interface LiveBattleSession {
  id: string;
  format_id: string;
  format_name: string;
  createdAt: number;
  status: "queued" | "running" | "completed" | "cancelled";
  currentPhase: string;
  currentPhaseIndex: number;
  phases: string[];
  elapsedSeconds: number;
  timeoutSeconds: number;
  winner: string | null;
  winReason: string | null;
  saved: boolean;
  agentA: AgentBattleState;
  agentB: AgentBattleState;
  judgeScores: {
    modelA: number;
    modelB: number;
    criteria: { name: string; scoreA: number; scoreB: number; weight: number }[];
  };
}

export function createBattleSession(
  formatId: string,
  modelAId: string,
  modelBId: string
): LiveBattleSession {
  const modelA = LEADERBOARD_MODELS.find((m) => m.id === modelAId) || LEADERBOARD_MODELS[0];
  const modelB = LEADERBOARD_MODELS.find((m) => m.id === modelBId) || LEADERBOARD_MODELS[2];
  const battleId = `arena-btl-${Math.random().toString(36).substring(2, 9)}`;

  const formatNames: Record<string, string> = {
    "security-ctf": "Security CTF: Builder vs Breaker Hot-Patching",
    "feature-race": "Full-Stack Feature Race: Real-time Microservice",
    "bug-bounty": "Bug Bounty: Concurrency Race Condition",
    "algo-optimization": "Algorithmic Latency & Memory Crunch"
  };

  const phases = ["1. Recon / Discovery", "2. Execution & Attack", "3. Mitigation & Patch", "4. Hardening & Tests", "5. Judge Evaluation"];

  const initUpdates = getPhaseUpdates(0, formatId, modelA.name, modelB.name);

  return {
    id: battleId,
    format_id: formatId,
    format_name: formatNames[formatId] || "Competitive Multi-Agent Match",
    createdAt: Date.now(),
    status: "running",
    currentPhase: phases[0],
    currentPhaseIndex: 0,
    phases,
    elapsedSeconds: 0,
    timeoutSeconds: 180,
    winner: null,
    winReason: null,
    saved: false,
    agentA: {
      id: modelA.id,
      name: modelA.name,
      role: "Builder / Defender",
      elo: modelA.elo,
      deltaElo: 0,
      score: 24,
      tokensPerSec: modelA.speed,
      status: "running",
      currentCode: initUpdates.agentACode,
      files: {
        "src/app.ts": initUpdates.agentACode
      },
      toolCalls: [
        {
          t: Date.now(),
          kind: "action_log",
          model_id: modelA.id,
          phase: phases[0],
          action: initUpdates.toolA.action,
          target: initUpdates.toolA.target,
          state: initUpdates.toolA.state,
          duration: initUpdates.toolA.duration,
          detail: initUpdates.toolA.detail
        }
      ],
      transcripts: [initUpdates.transcriptA],
      versions: [
        {
          version: 1,
          phase: phases[0],
          timestamp: "00:00",
          summary: initUpdates.toolA.detail,
          code: initUpdates.agentACode
        }
      ]
    },
    agentB: {
      id: modelB.id,
      name: modelB.name,
      role: "Breaker / Challenger",
      elo: modelB.elo,
      deltaElo: 0,
      score: 20,
      tokensPerSec: modelB.speed,
      status: "running",
      currentCode: initUpdates.agentBCode,
      files: {
        "fuzzer/suite.ts": initUpdates.agentBCode
      },
      toolCalls: [
        {
          t: Date.now(),
          kind: "action_log",
          model_id: modelB.id,
          phase: phases[0],
          action: initUpdates.toolB.action,
          target: initUpdates.toolB.target,
          state: initUpdates.toolB.state,
          duration: initUpdates.toolB.duration,
          detail: initUpdates.toolB.detail
        }
      ],
      transcripts: [initUpdates.transcriptB],
      versions: [
        {
          version: 1,
          phase: phases[0],
          timestamp: "00:00",
          summary: initUpdates.toolB.detail,
          code: initUpdates.agentBCode
        }
      ]
    },
    judgeScores: {
      modelA: 0,
      modelB: 0,
      criteria: [
        { name: "AST Correctness & Type Safety", scoreA: 0, scoreB: 0, weight: 0.3 },
        { name: "Vulnerability Mitigation / Exploit Success", scoreA: 0, scoreB: 0, weight: 0.4 },
        { name: "Performance & Token Efficiency", scoreA: 0, scoreB: 0, weight: 0.15 },
        { name: "Test Suite Coverage", scoreA: 0, scoreB: 0, weight: 0.15 }
      ]
    }
  };
}

export function getPhaseUpdates(
  phaseIndex: number,
  _formatId: string,
  modelAName: string,
  modelBName: string
) {
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (phaseIndex === 0) {
    return {
      agentACode: `// [${modelAName}] Phase 1: Static Codebase Analysis & AST Inspection
import { parse } from "@babel/parser";
import fs from "node:fs";

export function analyzeTarget() {
  const code = fs.readFileSync("src/auth.ts", "utf8");
  const ast = parse(code, { sourceType: "module" });
  
  // Checking for potential signature side-channel vulnerabilities...
  console.log("Analyzing 14 route handlers for CWE-208...");
  return { status: "vulnerability_located", target: "verifyHmacSignature" };
}`,
      agentBCode: `// [${modelBName}] Phase 1: Reconnaissance & Port Scanning
import axios from "axios";

export async function scanTargetEndpoints(baseUrl: string) {
  console.log("Probing API endpoints for timing variance...");
  const endpoints = ["/api/v1/auth", "/api/v1/token", "/api/v1/verify"];
  return endpoints.map(ep => ({ endpoint: ep, state: "open" }));
}`,
      toolA: {
        action: "AST_PARSE",
        target: "src/auth.ts",
        state: "ok" as const,
        duration: "24ms",
        detail: "Found unsafe string equality on HMAC token in verifyHmacSignature()."
      },
      toolB: {
        action: "PORT_SCAN",
        target: "http://sandbox-target.local",
        state: "ok" as const,
        duration: "48ms",
        detail: "Enumerated 3 endpoints with active HTTP listeners."
      },
      transcriptA: `[${timestamp}] Parsed AST tree: identified timing side-channel on HMAC signature.`,
      transcriptB: `[${timestamp}] Port scan completed: mapped active authentication endpoints.`
    };
  }

  if (phaseIndex === 1) {
    return {
      agentACode: `// [${modelAName}] Phase 2: Draft Constant-Time Security Patch
import crypto from "node:crypto";

export function verifySessionToken(rawToken: string, secret: string) {
  const parts = rawToken.split(".");
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expected = crypto.createHmac("sha256", secret).update(\`\${header}.\${payload}\`).digest("hex");

  // Constant-time buffer comparison prevents timing leaks
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}`,
      agentBCode: `// [${modelBName}] Phase 2: Timing Side-Channel Exploit Vector
export async function executeTimingAttack(targetUrl: string, sampleCount = 500) {
  const latencies: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const start = performance.now();
    await fetch(targetUrl, { headers: { Authorization: "Bearer forged.token." + i } });
    latencies.push(performance.now() - start);
  }
  const variance = Math.max(...latencies) - Math.min(...latencies);
  console.log(\`Measured timing variance: \${variance.toFixed(2)}ms\`);
  return { variance, vulnerable: variance > 1.2 };
}`,
      toolA: {
        action: "WRITE_FILE",
        target: "src/authMiddleware.ts",
        state: "ok" as const,
        duration: "18ms",
        detail: "Emitted 28 lines replacing naive comparison with crypto.timingSafeEqual."
      },
      toolB: {
        action: "DISPATCH_EXPLOIT",
        target: "/api/v1/auth",
        state: "ok" as const,
        duration: "140ms",
        detail: "Dispatched 500 high-frequency forged token requests."
      },
      transcriptA: `[${timestamp}] Applied constant-time comparison buffer check.`,
      transcriptB: `[${timestamp}] Sent 500 timing differential payloads to target.`
    };
  }

  if (phaseIndex === 2) {
    return {
      agentACode: `// [${modelAName}] Phase 3: Sliding Window Rate Limiter & Replay Defense
export class RateLimiter {
  private requests = new Map<string, number[]>();

  isAllowed(ip: string, maxRequests = 30, windowMs = 60000): boolean {
    const now = Date.now();
    const timestamps = (this.requests.get(ip) || []).filter(t => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      return false; // Throttled
    }
    timestamps.push(now);
    this.requests.set(ip, timestamps);
    return true;
  }
}`,
      agentBCode: `// [${modelBName}] Phase 3: Distributed IP Rotation & Header Bypass Probe
export async function rotateHeadersProbe(targetUrl: string) {
  const spoofedIps = ["192.168.1.1", "10.0.0.42", "172.16.0.100"];
  const results = [];
  for (const ip of spoofedIps) {
    const res = await fetch(targetUrl, {
      headers: { "X-Forwarded-For": ip, "Authorization": "Bearer test" }
    });
    results.push(res.status);
  }
  return results;
}`,
      toolA: {
        action: "AST_MUTATION_CHECK",
        target: "src/rateLimiter.ts",
        state: "ok" as const,
        duration: "32ms",
        detail: "Verified rate limiting logic handles IP spoofing securely."
      },
      toolB: {
        action: "EVAL_BYPASS",
        target: "src/rateLimiter.ts",
        state: "failed" as const,
        duration: "86ms",
        detail: "Header rotation failed: server enforces trusted proxy verification."
      },
      transcriptA: `[${timestamp}] Rate limiter compiled with sliding window mutex.`,
      transcriptB: `[${timestamp}] IP spoofing probe intercepted by trusted proxy policy.`
    };
  }

  // Phase 3 & 4 (Final Hardening & Scoring)
  return {
    agentACode: `// [${modelAName}] Final Hardened Workspace (All Checks Passed)
// 1. Constant-time crypto verification
// 2. Sliding window memory rate limiter
// 3. 100% Vitest coverage against timing side-channels

import { verifySessionToken } from "./authMiddleware";
import { RateLimiter } from "./rateLimiter";

export const securitySuite = {
  verifySessionToken,
  limiter: new RateLimiter()
};`,
    agentBCode: `// [${modelBName}] Exploit Summary
// Timing attack defeated by constant-time verification.
// IP rotation blocked by proxy validation.
// Final exploit success rate: 0.0%`,
    toolA: {
      action: "RUN_VITEST_SUITE",
      target: "tests/security.test.ts",
      state: "ok" as const,
      duration: "210ms",
      detail: "32/32 unit & penetration test cases passed."
    },
    toolB: {
      action: "AUDIT_SUMMARY",
      target: "reports/exploit_log.json",
      state: "ok" as const,
      duration: "45ms",
      detail: "Generated final penetration assessment report."
    },
    transcriptA: `[${timestamp}] Final verification complete: 100% test pass rate.`,
    transcriptB: `[${timestamp}] Exploit attempt concluded: target successfully defended.`
  };
}
