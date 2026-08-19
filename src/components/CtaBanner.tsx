import React, { useState } from "react";
import { Swords, ArrowUpRight, Copy, Check, Terminal, Sparkles } from "lucide-react";

interface CtaBannerProps {
  onOpenLiveBattleModal: () => void;
  onOpenExpertModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenLiveBattleModal, onOpenExpertModal }) => {
  const [copied, setCopied] = useState(false);
  const command = "npm i -g @agent-arena/cli && agent-arena init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative border-b border-border bg-[#0B0D10] py-20 md:py-28 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="rounded-3xl border border-borderStrong bg-surface2/90 p-8 sm:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="c-tag text-accent-pink mb-4 mx-auto">
              <Sparkles className="h-3 w-3" />
              <span>Zero Regressions Guaranteed</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Ready to Benchmark Your Autonomous Agents?
            </h2>

            <p className="text-base sm:text-lg text-muted mb-10 max-w-2xl mx-auto">
              Deploy your first multi-agent sandbox evaluation in less than 2 minutes. Free 100 evaluation credits included with every new account.
            </p>

            {/* Terminal Command Box */}
            <div className="inline-flex items-center justify-between gap-4 rounded-xl border border-borderStrong bg-[#07090C] px-5 py-3.5 font-mono text-xs text-codeFg shadow-inner max-w-xl w-full mb-10">
              <div className="flex items-center gap-2 truncate">
                <span className="text-accent font-bold">$</span>
                <span className="truncate">{command}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="grid h-7 w-7 shrink-0 place-items-center rounded bg-surface2 text-muted hover:text-white transition-colors"
                title="Copy install command"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenLiveBattleModal}
                className="btn-primary h-12 px-8 text-xs shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <Swords className="h-4 w-4 text-accent" />
                <span>Launch Free Match</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </button>

              <button
                type="button"
                onClick={onOpenExpertModal}
                className="btn-secondary h-12 px-8 text-xs"
              >
                <span>Talk to an Expert</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
