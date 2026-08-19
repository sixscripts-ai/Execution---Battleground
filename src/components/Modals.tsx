import React, { useState } from "react";
import { X, Swords, Calendar, Clock, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { LEADERBOARD_MODELS } from "../data/models";

interface LiveBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchMatch: (format: string, modelA: string, modelB: string) => void;
}

export const LiveBattleModal: React.FC<LiveBattleModalProps> = ({ isOpen, onClose, onLaunchMatch }) => {
  const [format, setFormat] = useState("security-ctf");
  const [modelA, setModelA] = useState("claude-3-7-sonnet");
  const [modelB, setModelB] = useState("deepseek-r1");
  const [isLaunching, setIsLaunching] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      onLaunchMatch(format, modelA, modelB);
      onClose();
      // Scroll to preview
      document.getElementById("battle-preview")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderStrong bg-[#0E1217] p-6 shadow-2xl">
        
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
          <div className="c-tag text-accent mb-2">
            <Swords className="h-3 w-3" />
            <span>Sandbox Configuration</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Configure Live Agent Battle
          </h3>
          <p className="text-xs text-muted mt-1">
            Spawn isolated microVM sandboxes and initiate real-time competitive evaluation.
          </p>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 font-mono text-xs">
          
          {/* Format Selection */}
          <div>
            <label className="block text-muted mb-1.5 uppercase tracking-wider text-[10px]">
              Benchmark Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
            >
              <option value="security-ctf">Security CTF: Breaker vs Builder Hot-Patching</option>
              <option value="feature-race">Full-Stack Feature Race: Greenfield App</option>
              <option value="bug-bounty">Bug Bounty: Concurrency Race Condition</option>
              <option value="algo-optimization">Algorithmic Latency Optimization</option>
            </select>
          </div>

          {/* Model A */}
          <div>
            <label className="block text-muted mb-1.5 uppercase tracking-wider text-[10px]">
              Model A (Defender / Builder)
            </label>
            <select
              value={modelA}
              onChange={(e) => setModelA(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
            >
              {LEADERBOARD_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider} - ELO {m.elo})
                </option>
              ))}
            </select>
          </div>

          {/* Model B */}
          <div>
            <label className="block text-muted mb-1.5 uppercase tracking-wider text-[10px]">
              Model B (Attacker / Challenger)
            </label>
            <select
              value={modelB}
              onChange={(e) => setModelB(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
            >
              {LEADERBOARD_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider} - ELO {m.elo})
                </option>
              ))}
            </select>
          </div>

          {/* MicroVM Specs */}
          <div className="rounded-lg border border-border bg-surface2/60 p-3 text-[10px] text-muted space-y-1">
            <div className="flex justify-between">
              <span>Runtime Isolation:</span>
              <span className="text-emerald-400 font-semibold">Firecracker MicroVM</span>
            </div>
            <div className="flex justify-between">
              <span>Grading Engine:</span>
              <span className="text-accent font-semibold">Deterministic AST + Vitest</span>
            </div>
            <div className="flex justify-between">
              <span>Evaluation Timeout:</span>
              <span className="text-white">300 seconds</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLaunch}
            disabled={isLaunching}
            className="btn-primary h-10 px-5 text-xs"
          >
            <Swords className="h-3.5 w-3.5 text-accent" />
            <span>{isLaunching ? "Spinning MicroVMs..." : "Spawn Battle Sandboxes"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

interface ExpertMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertMeetingModal: React.FC<ExpertMeetingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderStrong bg-[#0E1217] p-6 shadow-2xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-muted hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="c-tag text-accent-yellow mb-2">
              <Calendar className="h-3 w-3" />
              <span>30-Minute Architecture Review</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Talk to an Evaluation Architect
            </h3>
            <p className="text-xs text-muted mt-1 mb-6">
              Learn how to eliminate agent regressions, set up private VPC sandbox clusters, or build custom tournament benchmarks.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-muted mb-1 uppercase text-[10px]">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted mb-1 uppercase text-[10px]">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@company.com"
                  className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted mb-1 uppercase text-[10px]">Company / Project</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Autonomous Labs"
                  className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full h-11 text-xs"
                >
                  <span>Book 30-Min Session</span>
                  <ArrowRight className="h-3.5 w-3.5 text-accent" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-white">
              Meeting Request Confirmed!
            </h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              We have sent a calendar invitation and preparation guide to <strong className="text-white">{email}</strong>. Our team looks forward to meeting with you!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary mt-4"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
