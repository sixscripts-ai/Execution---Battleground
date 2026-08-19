import React from "react";
import { Cpu, ShieldCheck, Activity, Terminal, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";

interface FleetStatsProps {
  onOpenLiveBattleModal: () => void;
  onOpenExpertModal: () => void;
}

export const FleetStats: React.FC<FleetStatsProps> = ({ onOpenLiveBattleModal, onOpenExpertModal }) => {
  return (
    <section className="relative border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="c-tag text-accent-cyan mb-3">
              <span className="vector-4x4" />
              <span>MicroVM Sandbox Fleet</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              An enterprise fleet of evaluation sandboxes that grade every agent, every time.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenLiveBattleModal}
              className="btn-primary"
            >
              <span>Launch Battle</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </button>
            <button
              type="button"
              onClick={onOpenExpertModal}
              className="btn-secondary"
            >
              <span>Talk to an Expert</span>
            </button>
          </div>
        </div>

        {/* 3 Grid Items */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* Item 1 */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all group">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Sub-second MicroVM Sandboxes
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Agent Arena delivers pre-warmed, ephemeral microVM instances with isolated file systems, network mocking, and full Linux terminal access.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-codeFg">
                <span className="font-bold text-accent-yellow">14X faster</span>
                <span className="text-muted">than standard container boots</span>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all group">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent-yellow">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Boringly Deterministic Judges
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Instead of unpredictable, prompt-based LLM judges, Agent Arena uses formal AST analysis, Vitest/Playwright suites, and exploit harnesses.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-codeFg">
                <span className="font-bold text-emerald-400">0% prompt bias</span>
                <span className="text-muted">with reproducible test suites</span>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all group">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent-pink">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Deep Replayability &amp; Telemetry
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Every file mutation, terminal command, and tool latency is indexed with sub-millisecond precision for step-by-step diff inspection.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-codeFg">
                <span className="font-bold text-accent-pink">100% auditable</span>
                <span className="text-muted">structured action logs</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
