import React from "react";
import { Swords, ArrowUpRight, ShieldCheck, Activity, Terminal, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenLiveBattleModal: () => void;
  onOpenExpertModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLiveBattleModal, onOpenExpertModal }) => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-radial-gradient pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-borderStrong bg-surface2/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-codeFg">
              Next-Gen Autonomous Agent Benchmarking
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-border" />
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] text-accent-yellow">
              <Sparkles className="h-2.5 w-2.5" />
              Real-time ELO Calibration
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Execution &amp; Battleground Infrastructure for{" "}
            <span className="bg-gradient-to-r from-accent via-accent-cyan to-accent-pink bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted leading-relaxed font-normal mb-10">
            Deploy millions of competitive and collaborative agent bouts in secure microVM sandboxes. 
            Automated AST grading, live code inspection, and zero LLM judge bias.
          </p>

          {/* Button Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              type="button"
              onClick={onOpenLiveBattleModal}
              className="btn-primary h-12 px-7 text-xs"
            >
              <Swords className="h-4 w-4 text-accent" />
              <span>Launch Live Battle</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </button>

            <button
              type="button"
              onClick={onOpenExpertModal}
              className="btn-secondary h-12 px-7 text-xs"
            >
              <span>Talk to an Expert</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4 rounded-xl overflow-hidden shadow-2xl glass-panel">
            <div className="bg-surface/90 p-5 text-left">
              <div className="flex items-center gap-2 text-accent-yellow font-mono text-[9px] uppercase tracking-[0.12em] mb-1">
                <Activity className="h-3.5 w-3.5" />
                <span>Eval Velocity</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">14x Faster</div>
              <p className="text-[11px] text-muted mt-0.5">vs local container benchmarks</p>
            </div>

            <div className="bg-surface/90 p-5 text-left">
              <div className="flex items-center gap-2 text-accent font-mono text-[9px] uppercase tracking-[0.12em] mb-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Judge Integrity</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">0% Bias</div>
              <p className="text-[11px] text-muted mt-0.5">Deterministic test harnesses</p>
            </div>

            <div className="bg-surface/90 p-5 text-left">
              <div className="flex items-center gap-2 text-accent-pink font-mono text-[9px] uppercase tracking-[0.12em] mb-1">
                <Terminal className="h-3.5 w-3.5" />
                <span>Active Formats</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">450+</div>
              <p className="text-[11px] text-muted mt-0.5">CTFs, apps & bug bounties</p>
            </div>

            <div className="bg-surface/90 p-5 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[9px] uppercase tracking-[0.12em] mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sub-Second</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">&lt; 85ms</div>
              <p className="text-[11px] text-muted mt-0.5">Live ELO rating calibration</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
