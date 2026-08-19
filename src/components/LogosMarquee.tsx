import React from "react";
import { Cpu, Terminal, Sparkles, Shield, Zap, Layers, Globe, Bot } from "lucide-react";

export const LogosMarquee: React.FC = () => {
  const partners = [
    { name: "Anthropic", badge: "Claude 3.7", icon: Sparkles },
    { name: "OpenAI", badge: "GPT-4.5 / o3", icon: Bot },
    { name: "Google DeepMind", badge: "Gemini 2.0", icon: Globe },
    { name: "Groq", badge: "LPU Inference", icon: Zap },
    { name: "DeepSeek", badge: "R1 Reasoning", icon: Cpu },
    { name: "Meta AI", badge: "Llama 3.3", icon: Layers },
    { name: "LangChain", badge: "Agent Tooling", icon: Terminal },
    { name: "Composio", badge: "Agent Workflows", icon: Shield },
    { name: "Together AI", badge: "Inference Fleet", icon: Zap },
    { name: "Mistral AI", badge: "Le Chat / Codestral", icon: Bot },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-[#080A0D] py-10">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 text-muted font-mono text-[9px] uppercase tracking-[0.16em]">
          <span className="vector-4x4 text-accent-yellow" />
          <span>Ecosystem &amp; Lab Benchmarking Partners</span>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 py-2">
          {partners.concat(partners).map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface2/60 px-5 py-3 shadow-sm hover:border-borderStrong hover:bg-surface2 transition-all cursor-pointer shrink-0"
              >
                <div className="grid h-7 w-7 place-items-center rounded border border-borderStrong bg-[#0B0E12] text-muted group-hover:text-accent transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-display text-xs font-semibold text-white group-hover:text-accent transition-colors">
                    {partner.name}
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-wider text-muted">
                    {partner.badge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
