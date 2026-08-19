import React, { useState, useEffect } from "react";
import { LiveBattleSession } from "../services/battleEngine";
import { Swords, Trophy, Clock3, Play, Trash2, ArrowRight, ShieldCheck, History as HistoryIcon } from "lucide-react";

interface HistoryPageProps {
  onReplayBattle: (session: LiveBattleSession) => void;
  onNavigate: (page: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onReplayBattle, onNavigate }) => {
  const [battles, setBattles] = useState<LiveBattleSession[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("agent_arena_battles") || "[]");
      setBattles(stored);
    } catch {}
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("agent_arena_battles");
    setBattles([]);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="c-tag text-accent-yellow mb-2.5">
            <span className="vector-4x4" />
            <span>Audit Trail &amp; Replays</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Battle History &amp; Replays
          </h1>
          <p className="mt-1 text-sm text-muted">
            Inspect all past sandboxed matches, step-by-step tool traces, AST diffs, and deterministic judge scoring logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {battles.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="btn-ghost text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate("new")}
            className="btn-primary h-11 px-5 text-xs"
          >
            <Swords className="h-4 w-4 text-accent" />
            <span>Launch New Match</span>
          </button>
        </div>
      </div>

      {/* History List */}
      {battles.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center max-w-lg mx-auto">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-surface2 text-muted mx-auto mb-4">
            <HistoryIcon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-1">
            No Saved Battles Yet
          </h3>
          <p className="text-xs text-muted mb-6">
            Run a live sandbox battle between agents to generate replay logs, AST diffs, and deterministic scoring traces.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("new")}
            className="btn-primary mx-auto"
          >
            <span>Start Your First Match</span>
            <ArrowRight className="h-3.5 w-3.5 text-accent" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {battles.map((b) => (
            <div
              key={b.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 hover:border-borderStrong transition-all"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface2 border border-borderStrong text-accent">
                  <Swords className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-white">{b.id}</span>
                    <span className="rounded bg-white/5 border border-border px-2 py-0.5 font-mono text-[9px] text-muted">
                      {b.format_name}
                    </span>
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-codeFg">
                    <strong className="text-accent-pink">{b.agentA.name}</strong>
                    <span className="text-muted">vs</span>
                    <strong className="text-accent">{b.agentB.name}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right font-mono text-xs text-muted hidden md:block">
                  <div>{b.winner ? `Winner: ${b.agentA.name}` : "Completed"}</div>
                  <div className="text-[10px] text-muted">{new Date(b.createdAt).toLocaleTimeString()}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onReplayBattle(b)}
                  className="btn-secondary h-9 px-3 text-xs"
                >
                  <Play className="h-3 w-3" />
                  <span>Inspect Replay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
