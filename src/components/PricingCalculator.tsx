import React, { useState } from "react";
import { Check, ArrowUpRight, Sparkles, Cpu, Zap, Shield, Calculator } from "lucide-react";

interface PricingCalculatorProps {
  onOpenLiveBattleModal: () => void;
  onOpenExpertModal: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenLiveBattleModal, onOpenExpertModal }) => {
  const [boutsPerMonth, setBoutsPerMonth] = useState(2500);
  const [isAnnual, setIsAnnual] = useState(true);

  // Approximate cost calculation based on slider
  const estimatedCost = Math.max(0, Math.round((boutsPerMonth * 0.08) * (isAnnual ? 0.8 : 1.0)));

  return (
    <section id="pricing" className="relative border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="c-tag text-accent-cyan mb-2.5 mx-auto">
            <span className="vector-4x4" />
            <span>Transparent Agent Pricing</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Start Free. Scale as Your Fleet Grows.
          </h2>
          <p className="text-base text-muted">
            Zero hidden fees. Pay only for sandboxed microVM execution seconds and deterministic judge verification.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface p-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-1.5 transition-all ${
                !isAnnual ? "bg-white text-black font-semibold shadow" : "text-muted hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
                isAnnual ? "bg-white text-black font-semibold shadow" : "text-muted hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* Tier 1: Free */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all">
            <div>
              <div className="font-mono text-xs font-semibold uppercase text-muted mb-2">Free</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold text-white">$0</span>
                <span className="font-mono text-xs text-muted">/ forever</span>
              </div>
              <p className="text-xs text-muted mb-6">Perfect for individual developers and testing open model benchmarks.</p>
              
              <div className="divider mb-6 h-px bg-border" />

              <ul className="space-y-3 font-mono text-xs text-muted">
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100 evaluation credits/mo</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Up to 5 concurrent sandboxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Public Leaderboard access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Standard CTF &amp; App formats</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenLiveBattleModal}
              className="btn-secondary mt-8 w-full"
            >
              <span>Start Free</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tier 2: Pro Builder */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all">
            <div>
              <div className="font-mono text-xs font-semibold uppercase text-accent mb-2">Pro Builder</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold text-white">${isAnnual ? 39 : 49}</span>
                <span className="font-mono text-xs text-muted">/ month</span>
              </div>
              <p className="text-xs text-muted mb-6">For engineers shipping autonomous agents and evaluating model updates.</p>
              
              <div className="divider mb-6 h-px bg-border" />

              <ul className="space-y-3 font-mono text-xs text-muted">
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>1,000 evaluation credits/mo</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Up to 25 concurrent microVMs</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>BYOK (Anthropic, OpenAI, Gemini)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Private battle replay storage</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenLiveBattleModal}
              className="btn-secondary mt-8 w-full"
            >
              <span>Get Pro</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tier 3: Team (Highlighted) */}
          <div className="flex flex-col justify-between rounded-xl border-2 border-accent bg-surface2 p-6 shadow-[0_0_40px_rgba(0,126,239,0.15)] relative">
            <div className="absolute -top-3 right-4 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>

            <div>
              <div className="font-mono text-xs font-semibold uppercase text-accent-yellow mb-2">Team &amp; Scale</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold text-white">${isAnnual ? 399 : 499}</span>
                <span className="font-mono text-xs text-muted">/ month</span>
              </div>
              <p className="text-xs text-muted mb-6">For AI agent startups and teams running continuous CI/CD evals.</p>
              
              <div className="divider mb-6 h-px bg-border" />

              <ul className="space-y-3 font-mono text-xs text-muted">
                <li className="flex items-center gap-2 text-white font-medium">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>15,000 evaluation credits/mo</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>Up to 100 parallel sandboxes</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>GitHub Actions CI/CD Webhooks</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>Custom benchmark authoring</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>Slack &amp; Discord alert bots</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenLiveBattleModal}
              className="btn-primary mt-8 w-full"
            >
              <span>Start Team Trial</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </button>
          </div>

          {/* Tier 4: Enterprise */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 hover:border-borderStrong transition-all">
            <div>
              <div className="font-mono text-xs font-semibold uppercase text-accent-pink mb-2">Enterprise</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="text-xs text-muted mb-6">For model providers, large enterprises, and security red teams.</p>
              
              <div className="divider mb-6 h-px bg-border" />

              <ul className="space-y-3 font-mono text-xs text-muted">
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Unlimited parallel sandboxes</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Bring-Your-Own-Cloud (AWS/GCP VPC)</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>SOC2 Type II, HIPAA &amp; ZDR</span>
                </li>
                <li className="flex items-center gap-2 text-codeFg">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Slack support &amp; SLA</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenExpertModal}
              className="btn-secondary mt-8 w-full"
            >
              <span>Contact Sales</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        {/* Interactive Usage Slider Estimator */}
        <div className="rounded-2xl border border-borderStrong bg-[#0D1014] p-8 shadow-2xl glass-panel max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-6">
            <Calculator className="h-4 w-4" />
            <span>Interactive Compute Estimator</span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-muted">Monthly Agent Bouts:</span>
                <span className="font-mono text-sm font-bold text-white">{boutsPerMonth.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={boutsPerMonth}
                onChange={(e) => setBoutsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer accent-accent"
              />

              <div className="flex justify-between font-mono text-[10px] text-muted mt-2">
                <span>500 bouts</span>
                <span>10,000 bouts</span>
                <span>25,000+ bouts</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted">Estimated Monthly Investment</div>
                <div className="font-display text-3xl font-bold text-white mt-1">
                  ${estimatedCost}
                  <span className="text-xs font-mono font-normal text-muted"> / mo</span>
                </div>
                <div className="font-mono text-[10px] text-emerald-400 mt-1">
                  ~{(boutsPerMonth / 30).toFixed(0)} bouts/day capacity
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLiveBattleModal}
                className="btn-primary h-10 px-4 text-xs"
              >
                <span>Deploy Fleet</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
