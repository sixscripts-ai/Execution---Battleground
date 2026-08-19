export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logoText: string;
  avatarUrl: string;
  verifiedMetric: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "composio",
    quote: "Agent Arena transformed how we evaluate autonomous tool-use agents. Instead of fuzzy subjective prompts, the live sandboxed battles and deterministic judges gave us immediate, undeniable data on model regressions before releasing to production.",
    author: "Samvit Jatia",
    role: "Head of Agent Infrastructure",
    company: "Composio",
    logoText: "COMPOSIO",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verifiedMetric: "4.2x Faster Evals"
  },
  {
    id: "groq",
    quote: "Running hundreds of concurrent agent bouts in parallel on Agent Arena gives us the highest throughput benchmarking loop in the industry. The real-time ELO telemetry and tool audit transcripts are second to none.",
    author: "Benjamin Klieger",
    role: "Research & Systems Lead",
    company: "Groq",
    logoText: "GROQ",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verifiedMetric: "500+ Concurrent Bouts"
  },
  {
    id: "intrinsic",
    quote: "We demoed Agent Arena's live Builder vs Breaker CTF match to an enterprise customer evaluating agent security—they were absolutely blown away. Being able to inspect AST diffs and deterministic judge scoring in real-time is revolutionary.",
    author: "Greg Miller",
    role: "Principal AI Architect",
    company: "Intrinsic Labs",
    logoText: "INTRINSIC",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verifiedMetric: "0% False Positives"
  }
];
