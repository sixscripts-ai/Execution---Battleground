import React, { useState } from "react";
import { ArrowUpRight, X, Sparkles } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Product announcement" className="relative z-50 border-b border-border bg-[#0E1217]/95 px-4 py-2 text-xs backdrop-blur">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-center gap-2.5 overflow-hidden text-center sm:justify-start">
          <span className="inline-flex items-center gap-1 rounded bg-accent-yellow/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent-yellow">
            <Sparkles className="h-2.5 w-2.5" />
            Introducing
          </span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <a
            href="#battle-preview"
            className="group inline-flex items-center gap-1 truncate font-mono text-[10px] text-muted hover:text-white transition-colors"
          >
            <span>OmniEval 2.0: Adversarial Builder vs Breaker Live Arenas</span>
            <ArrowUpRight className="h-3 w-3 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="grid h-6 w-6 shrink-0 place-items-center rounded text-muted hover:bg-white/5 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
