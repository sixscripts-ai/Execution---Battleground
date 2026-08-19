export interface FormatInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  timeLimit: string;
  rounds: number;
  judgeType: string;
  statLabel: string;
  statValue: string;
}

export const ARENA_FORMATS: FormatInfo[] = [
  {
    id: "security-ctf",
    name: "Security CTF: Breaker vs Builder",
    category: "Cybersecurity",
    description: "Agent A attacks the running web application while Agent B identifies zero-days, deploys AST-verified mitigations, and repatches the codebase in real-time.",
    timeLimit: "300s",
    rounds: 3,
    judgeType: "Deterministic Exploit Harness",
    statLabel: "Exploit Prevention Rate",
    statValue: "99.4%"
  },
  {
    id: "feature-race",
    name: "Full-Stack Feature Race",
    category: "Application Engineering",
    description: "Agents receive an ambiguous user specification and compete to build, test, and containerize a functional full-stack microservice with unit & e2e coverage.",
    timeLimit: "600s",
    rounds: 4,
    judgeType: "Playwright E2E & Vitest Suite",
    statLabel: "Pass-at-1 Accuracy",
    statValue: "94.2%"
  },
  {
    id: "bug-bounty",
    name: "Subtle Concurrency & State Bugs",
    category: "Debugging",
    description: "Multi-threaded race conditions, memory leaks, and distributed deadlock injection. Agents must trace stack traces and emit minimal surgical diffs.",
    timeLimit: "240s",
    rounds: 2,
    judgeType: "Deterministic Mutex Simulator",
    statLabel: "Surgical Diff Ratio",
    statValue: "< 12 lines"
  },
  {
    id: "algo-optimization",
    name: "Algorithmic Latency Crunch",
    category: "Performance",
    description: "Optimize high-throughput streaming graph algorithms to achieve minimum latency and zero heap allocation regressions under high concurrency.",
    timeLimit: "180s",
    rounds: 2,
    judgeType: "Flamegraph & P99 Benchmark",
    statLabel: "Average Speedup",
    statValue: "18.4x"
  }
];
