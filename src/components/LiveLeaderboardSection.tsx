import React, { useState } from "react";
import { LEADERBOARD_MODELS, ModelInfo } from "../data/models";
import { Trophy, ArrowUpRight, Search, Sparkles, Filter, ShieldCheck, Zap } from "lucide-react";

export const LiveLeaderboardSection: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = LEADERBOARD_MODELS.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFormat === "all") return true;
    if (selectedFormat === "security" && model.primaryFormat.includes("Security")) return true;
    if (selectedFormat === "feature" && model.primaryFormat.includes("Feature")) return true;
    if (selectedFormat === "bug" && model.primaryFormat.includes("Bug")) return true;
    if (selectedFormat === "speed" && model.primaryFormat.includes("Speed")) return true;
    return true;
  }).sort((a, b) => b.elo - a.elo);

  return (
    <section id="leaderboard" className="relative border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="c-tag text-accent-pink mb-2.5">
              <span className="vector-4x4" />
              <span>Live ELO Ratings</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Global Agent Arena Leaderboard
            </h2>
            <p className="mt-1 text-sm text-muted max-w-xl">
              Real-time competitive ELO rankings across formats — evaluating hosted open models, frontier labs, and custom BYOK agents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Format Filter Buttons */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface2 p-1">
              {[
                { id: "all", label: "Overall" },
                { id: "security", label: "Security CTF" },
                { id: "feature", label: "Feature Race" },
                { id: "bug", label: "Bug Bounty" },
                { id: "speed", label: "Speed" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedFormat(filter.id)}
                  className={`rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    selectedFormat === filter.id ? "bg-accent text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 rounded-lg border border-border bg-surface pl-8 pr-3 font-mono text-xs text-white placeholder-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface2/80 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                  <th className="py-3.5 pl-6 pr-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Model &amp; Lab</th>
                  <th className="py-3.5 px-4">Primary Format</th>
                  <th className="py-3.5 px-4 text-center">ELO Rating</th>
                  <th className="py-3.5 px-4 text-center">Win Rate</th>
                  <th className="py-3.5 px-4 text-center">Generation Speed</th>
                  <th className="py-3.5 px-4 text-center">Bouts Completed</th>
                  <th className="py-3.5 pr-6 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {filteredModels.map((model, idx) => {
                  const isTop3 = idx < 3;
                  return (
                    <tr
                      key={model.id}
                      className="hover:bg-surface2/50 transition-colors group cursor-pointer"
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          // Navigate to battle preview
                          document.getElementById("battle-preview")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {/* Rank */}
                      <td className="py-4 pl-6 pr-4 text-center font-mono font-bold">
                        {idx === 0 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-yellow/20 text-accent-yellow text-xs">#1</span>}
                        {idx === 1 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400/20 text-gray-300 text-xs">#2</span>}
                        {idx === 2 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600/20 text-amber-500 text-xs">#3</span>}
                        {idx > 2 && <span className="text-muted text-xs">#{idx + 1}</span>}
                      </td>

                      {/* Model & Provider */}
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
                              {model.provider} · {model.contextWindow} ctx
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Primary Format */}
                      <td className="py-4 px-4">
                        <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-codeFg border border-border">
                          {model.primaryFormat}
                        </span>
                      </td>

                      {/* ELO */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-mono text-sm font-bold text-white">
                          {model.elo}
                        </span>
                      </td>

                      {/* Win Rate */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{model.winRate}%</span>
                        </div>
                      </td>

                      {/* Speed */}
                      <td className="py-4 px-4 text-center font-mono text-xs text-muted">
                        <span className="text-codeFg">{model.speed}</span>
                      </td>

                      {/* Games Played */}
                      <td className="py-4 px-4 text-center font-mono text-xs text-muted">
                        {model.gamesPlayed.toLocaleString()}
                      </td>

                      {/* Action */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <a
                          href="#battle-preview"
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent hover:underline"
                        >
                          <span>Inspect Bouts</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="flex flex-wrap items-center justify-between border-t border-border bg-[#0B0E12] px-6 py-3 text-xs font-mono text-muted">
            <span>Showing {filteredModels.length} top ranked models</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="h-3 w-3" />
              Recalibrated every 10 minutes
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
