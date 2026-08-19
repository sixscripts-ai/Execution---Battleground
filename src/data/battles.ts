export interface ToolCallEvent {
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

export interface BattleVersion {
  version: number;
  phase: string;
  timestamp: string;
  artifactSummary: string;
  files: Record<string, string>;
}

export interface SimulatedBattleData {
  id: string;
  format_id: string;
  format_name: string;
  round_visibility: string;
  timeout_seconds: number;
  status: "completed" | "running" | "evaluating";
  modelA: {
    id: string;
    name: string;
    role: "builder" | "defender";
    elo: number;
    deltaElo: number;
    score: number;
    tokensPerSec: string;
    currentArtifact: string;
    files: Record<string, string>;
    versions: BattleVersion[];
    toolCalls: ToolCallEvent[];
  };
  modelB: {
    id: string;
    name: string;
    role: "breaker" | "attacker";
    elo: number;
    deltaElo: number;
    score: number;
    tokensPerSec: string;
    currentArtifact: string;
    files: Record<string, string>;
    versions: BattleVersion[];
    toolCalls: ToolCallEvent[];
  };
}

export const SAMPLE_BATTLE: SimulatedBattleData = {
  id: "arena-btl-9824f81",
  format_id: "security-ctf",
  format_name: "Security CTF: Builder vs Breaker",
  round_visibility: "isolated-sandbox",
  timeout_seconds: 300,
  status: "completed",
  modelA: {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    role: "builder",
    elo: 1684,
    deltaElo: +18,
    score: 98.4,
    tokensPerSec: "88 t/s",
    currentArtifact: `// [Agent Arena] Builder Security Patch v3
// AST-Verified Secure Authentication Middleware with HMAC Time-Safe Comparison

import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export interface SessionPayload {
  userId: string;
  roles: string[];
  issuedAt: number;
  nonce: string;
}

const SESSION_TTL_MS = 15 * 60 * 1000; // 15 min TTL

export function verifySessionToken(rawHeader: string | undefined, secretKey: string): SessionPayload | null {
  if (!rawHeader || !rawHeader.startsWith("Bearer ")) {
    return null;
  }
  
  const token = rawHeader.slice(7).trim();
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, bodyB64, signatureHex] = parts;
  const expectedSig = crypto
    .createHmac("sha256", secretKey)
    .update(\`\${headerB64}.\${bodyB64}\`)
    .digest("hex");

  // Constant-time comparison prevents timing side-channels
  const sigBuffer = Buffer.from(signatureHex, "utf8");
  const expectedBuffer = Buffer.from(expectedSig, "utf8");
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf8")) as SessionPayload;
    if (Date.now() - payload.issuedAt > SESSION_TTL_MS) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export function enforceRateLimiter(bucket: Map<string, number[]>, ip: string, limit = 60, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = bucket.get(ip) || [];
  const valid = timestamps.filter(t => now - t < windowMs);
  if (valid.length >= limit) return false;
  valid.push(now);
  bucket.set(ip, valid);
  return true;
}`,
    files: {
      "work/authMiddleware.ts": `// AST-Verified Secure Authentication Middleware
import crypto from "node:crypto";

export function verifySessionToken(token: string, secret: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const expected = crypto.createHmac("sha256", secret).update(\`\${parts[0]}.\${parts[1]}\`).digest("hex");
  if (!crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) {
    return null;
  }
  return JSON.parse(Buffer.from(parts[1], "base64url").toString());
}`,
      "work/rateLimiter.ts": `// In-memory sliding window rate limiter
export class TokenBucketLimiter {
  private hits = new Map<string, number[]>();
  allow(key: string, limit = 50, windowMs = 60000): boolean {
    const now = Date.now();
    const timestamps = (this.hits.get(key) || []).filter(t => now - t < windowMs);
    if (timestamps.length >= limit) return false;
    timestamps.push(now);
    this.hits.set(key, timestamps);
    return true;
  }
}`,
      "work/exploitTest.test.ts": `import { test, expect } from "vitest";
import { verifySessionToken } from "./authMiddleware";

test("prevents forged HMAC token replay attack", () => {
  const forged = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.invalidsig";
  expect(verifySessionToken(forged, "secret-key-99")).toBeNull();
});`
    },
    versions: [
      {
        version: 1,
        phase: "discovery",
        timestamp: "14:32:01",
        artifactSummary: "Initial middleware audit & detected timing vulnerability in signature check.",
        files: { "work/authMiddleware.ts": "// v1 initial draft with regular string comparison" }
      },
      {
        version: 2,
        phase: "mitigation",
        timestamp: "14:32:48",
        artifactSummary: "Implemented crypto.timingSafeEqual and strict base64url payload parsing.",
        files: { "work/authMiddleware.ts": "// v2 timing-safe comparison added" }
      },
      {
        version: 3,
        phase: "hardening",
        timestamp: "14:33:30",
        artifactSummary: "Added multi-tier sliding-window rate limiting and automated regression tests.",
        files: { "work/authMiddleware.ts": "// v3 hardened AST-checked middleware" }
      }
    ],
    toolCalls: [
      {
        t: Date.now() - 65000,
        kind: "action_log",
        model_id: "claude-3-7-sonnet",
        phase: "discovery",
        action: "STATIC_AST_SCAN",
        target: "src/server/auth.ts",
        state: "ok",
        duration: "42ms",
        detail: "Found unsafe string equality comparison on HMAC digest (CWE-208)."
      },
      {
        t: Date.now() - 48000,
        kind: "action_log",
        model_id: "claude-3-7-sonnet",
        phase: "mitigation",
        action: "WRITE_FILE",
        target: "work/authMiddleware.ts",
        state: "ok",
        duration: "18ms",
        detail: "Wrote 54 lines replacing timing leak with constant-time buffer comparison."
      },
      {
        t: Date.now() - 32000,
        kind: "action_log",
        model_id: "claude-3-7-sonnet",
        phase: "hardening",
        action: "EXEC_SANDBOX_TEST",
        target: "pnpm test:security",
        state: "ok",
        duration: "340ms",
        detail: "24/24 security exploit test cases passed with 0ms leak tolerance."
      }
    ]
  },
  modelB: {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    role: "breaker",
    elo: 1642,
    deltaElo: -18,
    score: 82.1,
    tokensPerSec: "52 t/s",
    currentArtifact: `// [Agent Arena] Breaker Fuzzing Payload Harness v3
// Automated Timing Side-Channel Probe & Token Tamper Suite

export async function executeTimingAttack(targetUrl: string, candidateTokens: string[]) {
  const timings: { token: string; latencyNs: bigint }[] = [];
  
  for (const token of candidateTokens) {
    const start = process.hrtime.bigint();
    const res = await fetch(targetUrl, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    const elapsed = process.hrtime.bigint() - start;
    timings.push({ token, latencyNs: elapsed });
  }

  // Check statistical variance:
  const avg = timings.reduce((acc, t) => acc + Number(t.latencyNs), 0) / timings.length;
  const variance = timings.map(t => Math.abs(Number(t.latencyNs) - avg));
  const maxDelta = Math.max(...variance);

  if (maxDelta < 150_000) {
    return { exploitSuccessful: false, message: "Target protected by constant-time verification." };
  }
  return { exploitSuccessful: true, message: "Timing leak detected; signature byte oracle feasible." };
}`,
    files: {
      "fuzzer/exploit_probe.ts": `// Fuzzing timing side-channel probe
export async function probeSignatureOracle(endpoint: string) {
  // Generates 1,000 candidate prefixes
  return { status: "blocked_by_constant_time" };
}`,
      "fuzzer/rate_limit_bypass.ts": `// Distributed IP header rotation attempt
export const headers = ["X-Forwarded-For", "X-Real-IP", "CF-Connecting-IP"];`
    },
    versions: [
      {
        version: 1,
        phase: "probing",
        timestamp: "14:32:05",
        artifactSummary: "Fuzzing basic authentication headers with known timing differential probes.",
        files: { "fuzzer/exploit_probe.ts": "// v1 naive fuzzing script" }
      },
      {
        version: 2,
        phase: "side_channel",
        timestamp: "14:32:55",
        artifactSummary: "Attempted byte-by-byte HMAC signature oracle side-channel extraction.",
        files: { "fuzzer/exploit_probe.ts": "// v2 statistical variance probe" }
      }
    ],
    toolCalls: [
      {
        t: Date.now() - 60000,
        kind: "action_log",
        model_id: "deepseek-r1",
        phase: "probing",
        action: "HTTP_PROBE_FUZZ",
        target: "https://sandbox-target.local/api/v1/auth",
        state: "ok",
        duration: "180ms",
        detail: "Dispatched 500 requests testing header parsing boundaries."
      },
      {
        t: Date.now() - 38000,
        kind: "action_log",
        model_id: "deepseek-r1",
        phase: "side_channel",
        action: "EVAL_ORACLE",
        target: "fuzzer/exploit_probe.ts",
        state: "failed",
        duration: "410ms",
        detail: "Timing deviation < 12μs; builder's constant-time patch prevented signature leakage."
      }
    ]
  }
};
