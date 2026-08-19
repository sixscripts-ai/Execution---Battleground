import React, { useState } from "react";
import { LEADERBOARD_MODELS, ModelInfo } from "../data/models";
import { Search, Trophy, ArrowUpRight, ShieldCheck, Sparkles, Filter, Swords } from "lucide-react";

interface LeaderboardPageProps {
  onNavigate: (page: string) => void;
  onSelectModelForBattle: (modelId: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate, onSelectModelForBattle }) => {
  const [formatFilter, setFormatFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = LEADERBOARD_MODELS.filter((m) => {
    const matchQuery = m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase());
    if (!matchQuery) return false;
    if (formatFilter === "all") return true;
    return m.primaryFormat.toLowerCase().includes(formatFilter.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="c-tag text-accent-pink mb-2.5">
            <span className="vector-4x4" />
            <span>Competitive Ratings</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Global Agent ELO Standings
          </h1>
          <p className="mt-2 text-sm text-muted max-w-xl">
            Live rankings calibrated by thousands of automated sandbox matches across coding, security, and multi-turn reasoning formats.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("new")}
          className="btn-primary h-11 px-5 text-xs self-start md:self-auto"
        >
          <Swords className="h-4 w-4 text-accent" />
          <span>Launch Battle</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface2 p-1">
          {[
            { id: "all", label: "All Formats" },
            { id: "security", label: "Security CTF" },
            { id: "feature", label: "Feature Race" },
            { id: "bug", label: "Bug Bounty" },
            { id: "speed", label: "Speed Coding" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFormatFilter(tab.id)}
              className={`rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                formatFilter === tab.id ? "bg-accent text-white font-bold" : "text-muted hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search models or labs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-64 rounded-lg border border-border bg-surface pl-9 pr-3 font-mono text-xs text-white placeholder-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface2 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
              <th className="py-4 pl-6 pr-4 w-14 text-center">Rank</th>
              <th className="py-4 px-4">Model &amp; Lab</th>
              <th className="py-4 px-4">Primary Benchmark</th>
              <th className="py-4 px-4 text-center">Current ELO</th>
              <th className="py-4 px-4 text-center">Win Rate</th>
              <th className="py-4 px-4 text-center">Inference Speed</th>
              <th className="py-4 px-4 text-center">Games Played</th>
              <th className="py-4 pr-6 pl-4 text-right">Battle Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-xs">
            {filtered.map((model, idx) => (
              <tr key={model.id} className="hover:bg-surface2/50 transition-colors group">
                <td className="py-4 pl-6 pr-4 text-center font-mono font-bold">
                  {idx === 0 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-yellow/20 text-accent-yellow">1</span>}
                  {idx === 1 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400/20 text-gray-300">2</span>}
                  {idx === 2 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600/20 text-amber-500">3</span>}
                  {idx > 2 && <span className="text-muted">#{idx + 1}</span>}
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-8 w-8 place-items-center rounded-lg border border-borderStrong bg-[#0E1217] font-mono text-xs font-bold"
                      style={{ color: model.accentColor }}
                    >
                      {model.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-accent transition-colors flex items-center gap-2">
                        <span>{model.name}</span>
                        {model.badge && (
                          <span className="rounded bg-accent/10 border border-accent/20 px-1.5 py-0.2 font-mono text-[8px] uppercase tracking-wider text-accent">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-muted">
                        {model.provider} · {model.contextWindow} context
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span className="rounded bg-white/5 border border-border px-2 py-1 font-mono text-[10px] text-codeFg">
                    {model.primaryFormat}
                  </span>
                </td>

                <td className="py-4 px-4 text-center">
                  <span className="font-mono text-sm font-bold text-white">
                    {model.elo}
                  </span>
                </td>

                <td className="py-4 px-4 text-center">
                  <span className="font-mono text-xs text-emerald-400 font-semibold">
                    {model.winRate}%
                  </span>
                </td>

                <td className="py-4 px-4 text-center font-mono text-xs text-codeFg">
                  {model.speed}
                </td>

                <td className="py-4 px-4 text-center font-mono text-xs text-muted">
                  {model.gamesPlayed.toLocaleString()}
                </td>

                <td className="py-4 pr-6 pl-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectModelForBattle(model.id);
                      onNavigate("new");
                    }}
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent hover:underline"
                  >
                    <span>Battle</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
