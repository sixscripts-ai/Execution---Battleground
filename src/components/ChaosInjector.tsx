import React, { useState } from "react";
import { Zap, Flame, ShieldAlert, Cpu, AlertTriangle, Send, X, Sparkles } from "lucide-react";

export interface ChaosEvent {
  id: string;
  title: string;
  description: string;
  impact: string;
  iconName: string;
}

export const PRESET_CHAOS_EVENTS: ChaosEvent[] = [
  {
    id: "ddos-traffic-spike",
    title: "10x DDoS Traffic Spike",
    description: "Sandbox inbound network traffic surges 10x. Enforces strict rate-limiting and sliding-window cleanup.",
    impact: "Rate limiting test assertions enabled",
    iconName: "Flame"
  },
  {
    id: "strict-ast-linter",
    title: "Enforce Strict AST Type Checker",
    description: "All 'any' types and implicit coercions trigger instant failure. Requires explicit TypeScript interfaces.",
    impact: "Zero-any rule active",
    iconName: "Cpu"
  },
  {
    id: "cache-invalidation-drop",
    title: "In-Memory State Corruption",
    description: "Simulates sudden memory drop. Agents must implement atomic mutex locks and graceful state recovery.",
    impact: "Memory persistence verified",
    iconName: "ShieldAlert"
  },
  {
    id: "unicode-null-byte-fuzz",
    title: "Null-Byte & Unicode Injection Attack",
    description: "Breaker model injects %00 null-byte termination payloads to bypass header validation regex.",
    impact: "Sanitization test suite triggered",
    iconName: "AlertTriangle"
  }
];

interface ChaosInjectorProps {
  isOpen: boolean;
  onClose: () => void;
  onInjectChaos: (chaos: ChaosEvent | { title: string; description: string }) => void;
}

export const ChaosInjector: React.FC<ChaosInjectorProps> = ({ isOpen, onClose, onInjectChaos }) => {
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    onInjectChaos({
      title: customTitle,
      description: customDesc || "Custom spectator curveball injected mid-match."
    });
    setCustomTitle("");
    setCustomDesc("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-borderStrong bg-[#0E1217] p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-muted hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="c-tag text-accent-pink mb-2">
            <Flame className="h-3 w-3" />
            <span>Human-in-the-Loop Curveball Engine</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Inject Live Chaos into Match
          </h3>
          <p className="text-xs text-muted mt-1">
            Test agent resilience and self-healing in real-time. Dispatches an unexpected constraint or attack vector to both models mid-match.
          </p>
        </div>

        {/* Preset Chaos Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {PRESET_CHAOS_EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                onInjectChaos(event);
                onClose();
              }}
              className="cursor-pointer rounded-xl border border-border bg-[#0B0E12] p-4 hover:border-accent hover:bg-surface2 transition-all group"
            >
              <div className="flex items-center gap-2 font-display text-xs font-semibold text-white group-hover:text-accent mb-1">
                <Flame className="h-3.5 w-3.5 text-accent-pink" />
                <span>{event.title}</span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed line-clamp-2 mb-2">
                {event.description}
              </p>
              <div className="font-mono text-[9px] text-accent-yellow">
                ⚡ {event.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Chaos Form */}
        <form onSubmit={handleCustomSubmit} className="rounded-xl border border-border bg-surface p-4 space-y-3 font-mono text-xs">
          <div className="text-[10px] uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-accent-yellow" />
            <span>Or Write a Custom Curveball</span>
          </div>

          <div>
            <input
              type="text"
              placeholder="e.g. Rate limit window reduced from 60s to 500ms"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!customTitle.trim()}
              className="btn-primary h-9 px-4 text-xs"
            >
              <Send className="h-3 w-3 text-accent" />
              <span>Inject Custom Event</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
