export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  providerType: "groq" | "gemini" | "openai" | "anthropic" | "openrouter" | "mistral" | "deepseek" | "agentrouter" | "ollama";
  apiModelId: string;
  elo: number;
  gamesPlayed: number;
  winRate: number;
  speed: string; // e.g. "124 t/s"
  contextWindow: string;
  primaryFormat: string;
  badge?: string;
  accentColor: string;
}

export const LEADERBOARD_MODELS: ModelInfo[] = [
  // 1. DeepSeek Official Reasoning & Chat Models
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 (671B Reasoning)",
    provider: "DeepSeek",
    providerType: "deepseek",
    apiModelId: "deepseek-reasoner",
    elo: 1712,
    gamesPlayed: 3100,
    winRate: 83.4,
    speed: "65 t/s",
    contextWindow: "128k",
    primaryFormat: "Security CTF",
    badge: "Reasoning King",
    accentColor: "#007EEF"
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3 (671B MoE)",
    provider: "DeepSeek",
    providerType: "deepseek",
    apiModelId: "deepseek-chat",
    elo: 1658,
    gamesPlayed: 2800,
    winRate: 74.5,
    speed: "120 t/s",
    contextWindow: "128k",
    primaryFormat: "Feature Race",
    badge: "Open Frontier",
    accentColor: "#007EEF"
  },

  // 2. Groq LPU Models (Ultra-Fast Live Execution)
  {
    id: "groq-gpt-oss-120b",
    name: "GPT OSS 120B (Groq LPU)",
    provider: "OpenAI / Groq",
    providerType: "groq",
    apiModelId: "openai/gpt-oss-120b",
    elo: 1692,
    gamesPlayed: 1840,
    winRate: 81.2,
    speed: "450 t/s",
    contextWindow: "131k",
    primaryFormat: "Security CTF",
    badge: "Fastest 120B",
    accentColor: "#F58DE3"
  },
  {
    id: "groq-gpt-oss-20b",
    name: "GPT OSS 20B (Groq LPU)",
    provider: "OpenAI / Groq",
    providerType: "groq",
    apiModelId: "openai/gpt-oss-20b",
    elo: 1610,
    gamesPlayed: 2150,
    winRate: 71.4,
    speed: "750 t/s",
    contextWindow: "131k",
    primaryFormat: "Speed Coding",
    badge: "Sub-100ms",
    accentColor: "#38BDF8"
  },
  {
    id: "groq-qwen-3-6-27b",
    name: "Qwen 3.6 27B (Groq LPU)",
    provider: "Alibaba / Groq",
    providerType: "groq",
    apiModelId: "qwen/qwen3.6-27b",
    elo: 1655,
    gamesPlayed: 1420,
    winRate: 74.8,
    speed: "520 t/s",
    contextWindow: "131k",
    primaryFormat: "Feature Race",
    badge: "Reasoning & Vision",
    accentColor: "#FDD07B"
  },
  {
    id: "groq-compound",
    name: "Compound Beta (Groq LPU)",
    provider: "Groq",
    providerType: "groq",
    apiModelId: "groq/compound",
    elo: 1630,
    gamesPlayed: 1100,
    winRate: 70.1,
    speed: "600 t/s",
    contextWindow: "131k",
    primaryFormat: "Bug Bounty",
    accentColor: "#10B981"
  },

  // 3. Anthropic Frontier Models
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    providerType: "anthropic",
    apiModelId: "claude-3-7-sonnet-20250219",
    elo: 1710,
    gamesPlayed: 2420,
    winRate: 82.5,
    speed: "88 t/s",
    contextWindow: "200k",
    primaryFormat: "Security CTF",
    badge: "Champion",
    accentColor: "#F58DE3"
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerType: "anthropic",
    apiModelId: "claude-3-5-sonnet-20241022",
    elo: 1675,
    gamesPlayed: 3200,
    winRate: 76.9,
    speed: "80 t/s",
    contextWindow: "200k",
    primaryFormat: "Feature Race",
    accentColor: "#F58DE3"
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    providerType: "anthropic",
    apiModelId: "claude-3-5-haiku-20241022",
    elo: 1545,
    gamesPlayed: 1980,
    winRate: 59.2,
    speed: "160 t/s",
    contextWindow: "200k",
    primaryFormat: "Speed Coding",
    accentColor: "#F58DE3"
  },

  // 4. OpenAI Frontier Models
  {
    id: "gpt-4-5-preview",
    name: "GPT-4.5 Preview",
    provider: "OpenAI",
    providerType: "openai",
    apiModelId: "gpt-4.5-preview",
    elo: 1690,
    gamesPlayed: 1890,
    winRate: 79.4,
    speed: "64 t/s",
    contextWindow: "128k",
    primaryFormat: "Feature Race",
    badge: "Top Contender",
    accentColor: "#10B981"
  },
  {
    id: "o3-mini-high",
    name: "o3-mini (High Reasoning)",
    provider: "OpenAI",
    providerType: "openai",
    apiModelId: "o3-mini",
    elo: 1668,
    gamesPlayed: 1610,
    winRate: 75.1,
    speed: "95 t/s",
    contextWindow: "128k",
    primaryFormat: "Bug Bounty",
    badge: "Deep Reasoning",
    accentColor: "#10B981"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerType: "openai",
    apiModelId: "gpt-4o",
    elo: 1625,
    gamesPlayed: 4500,
    winRate: 69.8,
    speed: "115 t/s",
    contextWindow: "128k",
    primaryFormat: "API Integration",
    accentColor: "#10B981"
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    providerType: "openai",
    apiModelId: "gpt-4o-mini",
    elo: 1520,
    gamesPlayed: 2800,
    winRate: 56.4,
    speed: "190 t/s",
    contextWindow: "128k",
    primaryFormat: "Speed Coding",
    accentColor: "#10B981"
  },

  // 5. Google Gemini Models
  {
    id: "gemini-3-7-flash",
    name: "Gemini 3.7 Flash",
    provider: "Google",
    providerType: "gemini",
    apiModelId: "gemini-3.7-flash",
    elo: 1682,
    gamesPlayed: 1350,
    winRate: 77.5,
    speed: "220 t/s",
    contextWindow: "1M",
    primaryFormat: "Speed Coding",
    badge: "Hybrid Thinking",
    accentColor: "#FDD07B"
  },
  {
    id: "gemini-3-6-flash",
    name: "Gemini 3.6 Flash",
    provider: "Google",
    providerType: "gemini",
    apiModelId: "gemini-3.6-flash",
    elo: 1640,
    gamesPlayed: 2100,
    winRate: 72.3,
    speed: "210 t/s",
    contextWindow: "1M",
    primaryFormat: "Feature Race",
    accentColor: "#FDD07B"
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    providerType: "gemini",
    apiModelId: "gemini-2.5-pro",
    elo: 1672,
    gamesPlayed: 1780,
    winRate: 76.1,
    speed: "95 t/s",
    contextWindow: "2M",
    primaryFormat: "Security CTF",
    accentColor: "#FDD07B"
  },
  {
    id: "gemini-3-1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    provider: "Google",
    providerType: "gemini",
    apiModelId: "gemini-3.1-flash-lite",
    elo: 1530,
    gamesPlayed: 1450,
    winRate: 58.0,
    speed: "280 t/s",
    contextWindow: "1M",
    primaryFormat: "Speed Coding",
    accentColor: "#FDD07B"
  },

  // 6. Meta Open Models
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B Instruct",
    provider: "Meta AI",
    providerType: "openrouter",
    apiModelId: "meta-llama/llama-3.3-70b-instruct",
    elo: 1590,
    gamesPlayed: 2600,
    winRate: 67.2,
    speed: "120 t/s",
    contextWindow: "128k",
    primaryFormat: "Feature Race",
    accentColor: "#818CF8"
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B Instruct",
    provider: "Meta AI",
    providerType: "openrouter",
    apiModelId: "meta-llama/llama-3.1-405b-instruct",
    elo: 1670,
    gamesPlayed: 1200,
    winRate: 75.9,
    speed: "45 t/s",
    contextWindow: "128k",
    primaryFormat: "Security CTF",
    accentColor: "#818CF8"
  },

  // 7. Mistral & Qwen Coding Models
  {
    id: "codestral-latest",
    name: "Codestral 25.01",
    provider: "Mistral AI",
    providerType: "mistral",
    apiModelId: "codestral-latest",
    elo: 1648,
    gamesPlayed: 1950,
    winRate: 73.1,
    speed: "140 t/s",
    contextWindow: "256k",
    primaryFormat: "Speed Coding",
    badge: "Code Specialist",
    accentColor: "#FF7000"
  },
  {
    id: "qwen-2-5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    provider: "Alibaba Cloud",
    providerType: "openrouter",
    apiModelId: "qwen/qwen-2.5-coder-32b-instruct",
    elo: 1612,
    gamesPlayed: 2300,
    winRate: 68.7,
    speed: "135 t/s",
    contextWindow: "128k",
    primaryFormat: "API Integration",
    accentColor: "#38BDF8"
  },

  // 8. AgentRouter Gateway Models (Free Credits via agentrouter.org)
  {
    id: "ar-claude-sonnet-4",
    name: "Claude Sonnet 4 (AgentRouter)",
    provider: "AgentRouter",
    providerType: "agentrouter",
    apiModelId: "claude-sonnet-4-20250514",
    elo: 1715,
    gamesPlayed: 420,
    winRate: 84.1,
    speed: "82 t/s",
    contextWindow: "200k",
    primaryFormat: "Security CTF",
    badge: "Free Gateway",
    accentColor: "#9333EA"
  },
  {
    id: "ar-claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet (AgentRouter)",
    provider: "AgentRouter",
    providerType: "agentrouter",
    apiModelId: "claude-3-5-sonnet-20241022",
    elo: 1680,
    gamesPlayed: 680,
    winRate: 77.2,
    speed: "78 t/s",
    contextWindow: "200k",
    primaryFormat: "Feature Race",
    accentColor: "#9333EA"
  },
  {
    id: "ar-gpt-4o",
    name: "GPT-4o (AgentRouter)",
    provider: "AgentRouter",
    providerType: "agentrouter",
    apiModelId: "gpt-4o",
    elo: 1635,
    gamesPlayed: 550,
    winRate: 70.5,
    speed: "110 t/s",
    contextWindow: "128k",
    primaryFormat: "Feature Race",
    accentColor: "#9333EA"
  },
  {
    id: "ar-deepseek-r1",
    name: "DeepSeek R1 (AgentRouter)",
    provider: "AgentRouter",
    providerType: "agentrouter",
    apiModelId: "deepseek-reasoner",
    elo: 1700,
    gamesPlayed: 390,
    winRate: 82.0,
    speed: "60 t/s",
    contextWindow: "128k",
    primaryFormat: "Security CTF",
    badge: "Free R1",
    accentColor: "#9333EA"
  },
  {
    id: "ar-deepseek-v3",
    name: "DeepSeek V3 (AgentRouter)",
    provider: "AgentRouter",
    providerType: "agentrouter",
    apiModelId: "deepseek-chat",
    elo: 1650,
    gamesPlayed: 470,
    winRate: 73.8,
    speed: "115 t/s",
    contextWindow: "128k",
    primaryFormat: "Feature Race",
    accentColor: "#9333EA"
  }
];

export function findModelInfo(modelId: string): ModelInfo {
  return LEADERBOARD_MODELS.find(m => m.id === modelId) || {
    id: modelId,
    name: modelId,
    provider: "Custom",
    providerType: "openrouter",
    apiModelId: modelId,
    elo: 1500,
    gamesPlayed: 0,
    winRate: 50.0,
    speed: "100 t/s",
    contextWindow: "128k",
    primaryFormat: "General",
    accentColor: "#007EEF"
  };
}
