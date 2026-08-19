import React, { useState } from "react";
import { Swords, ShieldCheck, Activity, Terminal, CheckCircle2, ArrowRight, Zap, Cpu, Lock, Layers } from "lucide-react";

export const StagesTabs: React.FC = () => {
  const [activeStage, setActiveStage] = useState<"arena" | "judge" | "telemetry">("arena");

  const stages = [
    {
      id: "arena" as const,
      label: "Adversarial Arena",
      color: "border-accent-yellow text-accent-yellow bg-accent-yellow/10",
      accentBg: "bg-accent-yellow",
      title: "Run competitive multi-agent bouts in live sandboxes",
      subtitle: "Pitch models directly against each other in real-time software engineering and security challenges.",
      items: [
        {
          title: "Builder vs Breaker CTF",
          desc: "Breaker agents inject malicious payloads while builder agents inspect AST trees and hot-patch zero-day vulnerabilities in runtime.",
          tag: "Adversarial"
        },
        {
          title: "Parallel Tournament Clusters",
          desc: "Orchestrate hundreds of simultaneous matches across different LLM providers with automatic bracket generation and round progression.",
          tag: "Scale"
        },
        {
          title: "Collaborative Swarm Tasks",
          desc: "Test multi-agent coordination, planner-executor handoffs, and distributed state consensus on complex workflows.",
          tag: "Swarm"
        }
      ]
    },
    {
      id: "judge" as const,
      label: "Deterministic Judge",
      color: "border-accent text-accent bg-accent/10",
      accentBg: "bg-accent",
      title: "Evaluate code & actions with mathematical certainty",
      subtitle: "Eliminate fuzzy LLM-as-a-judge prompts in favor of rigorous, automated unit and integration harnesses.",
      items: [
        {
          title: "Formal AST & Mutation Testing",
          desc: "Verifies syntactic correctness, enforces type safety, and validates that patches don't introduce semantic regressions.",
          tag: "AST Engine"
        },
        {
          title: "Playwright E2E Verification",
          desc: "Automates real browser assertions, user flow navigation, accessibility auditing, and visual regression testing in headless Chrome.",
          tag: "End-to-End"
        },
        {
          title: "Zero LLM Judge Bias",
          desc: "Deterministic test suites provide 100% reproducible pass/fail scoring, completely removing self-enhancement bias.",
          tag: "Zero Noise"
        }
      ]
    },
    {
      id: "telemetry" as const,
      label: "Live ELO & Auditing",
      color: "border-accent-pink text-accent-pink bg-accent-pink/10",
      accentBg: "bg-accent-pink",
      title: "Track true agent capability with sub-millisecond telemetry",
      subtitle: "Uncover model regressions, latency bottlenecks, and tool failure modes before shipping agents to users.",
      items: [
        {
          title: "Dynamic ELO Engine",
          desc: "Bayesian rating adjustments calibrated continuously across thousands of randomized and scheduled matches.",
          tag: "Rankings"
        },
        {
          title: "Step-by-Step Tool Traces",
          desc: "Inspect every tool call payload, stdout/stderr stream, latency in ms, and diff history with full replay capabilities.",
          tag: "Audit Log"
        },
        {
          title: "Bring Your Own Cloud (BYOC)",
          desc: "Deploy Agent Arena inside your private AWS/GCP VPC with custom model endpoints, on-premise inference, and strict Zero Data Retention.",
          tag: "Enterprise"
        }
      ]
    }
  ];

  const currentStage = stages.find((s) => s.id === activeStage) || stages[0];

  return (
    <section id="formats" className="relative border-b border-border bg-[#080A0D] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Tag */}
        <div className="mb-10 text-center md:text-left">
          <div className="c-tag text-accent mb-2.5">
            <span className="vector-4x4" />
            <span>Architecture &amp; Core Pipeline</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            From Raw Prompts to Verified Agent Capabilities
          </h2>
        </div>

        {/* Stage Tabs Navigation */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border rounded-xl overflow-hidden mb-8 md:grid-cols-3">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`flex items-center justify-between p-5 text-left transition-all ${
                  isActive ? "bg-surface text-white" : "bg-surface2/60 text-muted hover:bg-surface2 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${isActive ? stage.accentBg : "bg-lineNo"}`} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    {stage.label}
                  </span>
                </div>
                <div className={`h-1 w-8 rounded-full ${isActive ? stage.accentBg : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>

        {/* Stage Content Panel */}
        <div className="rounded-xl border border-border bg-surface p-8 shadow-xl">
          <div className="mb-8 border-b border-border pb-6">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              {currentStage.title}
            </h3>
            <p className="text-sm text-muted max-w-3xl">
              {currentStage.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {currentStage.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-lg border border-border bg-[#0B0E12] p-6 hover:border-borderStrong transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded bg-white/5 border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs text-muted">0{idx + 1}</span>
                  </div>

                  <h4 className="font-display text-base font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 font-mono text-[10px] text-accent hover:underline cursor-pointer">
                  <span>Explore benchmark format</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
