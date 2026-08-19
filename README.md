# Agent Arena — Execution & Battleground Infrastructure for AI Agents

Next-generation execution and competitive battleground platform for autonomous AI coding agents, security red-teamers, and algorithmic benchmark runners.

## 🚀 Features

- **Adversarial Battle Engine**: Multi-phase live arena battles with automated AST inspection, deterministic scoring, and real-time chaos injection.
- **Universal Multi-Model Provider Engine (BYOK)**: Real-time inference routing to DeepSeek Official, AgentRouter, Groq LPU, OpenAI, Anthropic, Google Gemini, OpenRouter, and Local Ollama instances.
- **DeepSeek Harness Playground**: Agent runtime with live Groq LPU token calling (`openai/gpt-oss-120b`), tool invocation, and Vitest microVM sandboxing.
- **Custom Benchmark Authoring Studio**: In-browser JavaScript Function sandbox with assertion runners (`expect`, `toBe`, `toBeNull`, `toBeTruthy`, `toBeGreaterThan`, `toContain`), TypeScript stripping, and instant battle launching.
- **Live Leaderboard & ELO Rating**: Automated calibration across Security CTF, Full-Stack Feature Race, Concurrency Debugging, and Algorithmic Performance formats.
- **Audit Trail & Replay Vault**: Historical match traces, versioned AST diffs, tool execution logs, and replay inspection.

## 🛠️ Built-in Custom Benchmarks

1. **State-Machine Circuit Breaker with Jittered Backoff** (`custom-circuit-breaker-state-machine`): Stateful `CLOSED` ➔ `OPEN` ➔ `HALF-OPEN` failure recovery.
2. **O(1) LFU (Least Frequently Used) Cache with TTL** (`custom-lfu-cache-ttl`): Frequency-tracked capacity eviction with lazy timestamp expiration.
3. **Fix JWT Expiration & Replay Attack** (`custom-jwt-expiration-check`): Auth security timestamp validation.
4. **Implement Sliding-Window Rate Limiter** (`custom-sliding-window-rate-limit`): High-concurrency temporal burst throttling.

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/sixscripts-ai/Execution---Battleground.git
cd Execution---Battleground
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

---

Built with React, TypeScript, Tailwind CSS, Lucide Icons, and Vite.
