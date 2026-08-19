import React from "react";
import { Cpu, Terminal, Shield, ArrowUpRight, CheckCircle2, Sparkles, Layers, Box } from "lucide-react";

export const BentoGrid: React.FC = () => {
  return (
    <section id="bento" className="relative border-b border-border bg-[#090A0C] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="c-tag text-accent-yellow mb-2.5">
            <span className="vector-4x4" />
            <span>Built for Modern AI Teams</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for the Entire Agent Lifecycle
          </h2>
          <p className="mt-1 text-sm text-muted max-w-2xl">
            Whether you train foundation models or build vertical SaaS agents, Agent Arena gives you reproducible, quantitative confidence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          
          {/* Card 1: SaaS Builders (Large 8-col) */}
          <div className="md:col-span-8 flex flex-col justify-between rounded-xl border border-border bg-surface p-8 hover:border-borderStrong transition-all relative overflow-hidden group">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent">
                <Terminal className="h-5 w-5" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted block mb-1">
                For Application Developers
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Stop Ship-Breaking Agent Regressions
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xl mb-6">
                Integrate Agent Arena directly into your GitHub CI/CD pipeline. Automatically run your agent against a battery of 50+ sandboxed regression tests on every pull request.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-codeFg">
                <div className="flex items-center gap-2 rounded-lg bg-surface2 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Automated PR diff assertions</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface2 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Microsecond tool latency profiling</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <span className="font-mono text-[10px] text-muted">CI/CD &amp; Webhook Integration</span>
              <a href="#pricing" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent hover:underline">
                <span>View CI/CD setup</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Enterprise Security (4-col) */}
          <div className="md:col-span-4 flex flex-col justify-between rounded-xl border border-border bg-surface p-8 hover:border-borderStrong transition-all relative overflow-hidden group">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent-pink">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted block mb-1">
                Security &amp; Red-Teaming
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Adversarial Stress Testing
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Red-team autonomous agents against prompt injections, unauthorized tool calls, SSRF exploits, and private data exfiltration in hardened, quarantined microVMs.
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <div className="font-mono text-[10px] text-emerald-400 font-semibold">
                ✓ SOC2 Type II &amp; HIPAA Compliant
              </div>
            </div>
          </div>

          {/* Card 3: AI Researchers & Model Labs (4-col) */}
          <div className="md:col-span-4 flex flex-col justify-between rounded-xl border border-border bg-surface p-8 hover:border-borderStrong transition-all relative overflow-hidden group">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent-yellow">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted block mb-1">
                Foundational Research
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Frontier Model Evals
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Evaluate multi-turn reasoning, self-correction, and long-horizon tool execution without relying on subjective human raters.
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <div className="font-mono text-[10px] text-accent-yellow font-semibold">
                ★ 100% Deterministic Reproducibility
              </div>
            </div>
          </div>

          {/* Card 4: Benchmark Creators & Open Source (Large 8-col) */}
          <div className="md:col-span-8 flex flex-col justify-between rounded-xl border border-border bg-surface p-8 hover:border-borderStrong transition-all relative overflow-hidden group">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-accent-cyan">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted block mb-1">
                Ecosystem &amp; Benchmarks
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Publish Custom Benchmark Arenas
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xl mb-6">
                Create custom challenge suites for your domain (Finance, Healthcare, DevTools, Cyber). Define initial files, inject fuzzing mutations, and verify scoring with deterministic test assertions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-codeFg">
                <div className="flex items-center gap-2 rounded-lg bg-surface2 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>SDK &amp; Python CLI harnesses</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface2 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Cryptographic scoreboard proofs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <span className="font-mono text-[10px] text-muted">Open Source &amp; Custom Arenas</span>
              <a href="#pricing" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent hover:underline">
                <span>Create custom benchmark</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
