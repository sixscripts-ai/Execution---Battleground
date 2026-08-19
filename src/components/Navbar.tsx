import React, { useState } from "react";
import { Swords, Menu, X, Trophy, History, Key, Cpu, Sparkles, PlusCircle } from "lucide-react";
import { loadApiKeys } from "../services/llmService";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenExpertModal: () => void;
  onOpenLiveBattleModal: () => void;
  onOpenKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenExpertModal,
  onOpenKeyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = loadApiKeys();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2.5 text-white group text-left"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-borderStrong bg-surface2 text-accent group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(0,126,239,0.3)] transition-all">
              <Swords className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                AGENT ARENA
                <span className="rounded bg-accent/15 px-1.5 py-0.2 font-mono text-[8px] font-semibold text-accent border border-accent/30">
                  v2.5
                </span>
              </span>
              <span className="font-sans text-[10px] text-muted font-normal">
                AI Evaluation Battleground
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className={`rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "landing" ? "text-white font-semibold bg-surface2" : "text-muted hover:text-white"
              }`}
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => onNavigate("new")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "new" || currentPage === "battle" ? "text-accent font-semibold bg-accent/15 border border-accent/30" : "text-muted hover:text-white"
              }`}
            >
              <Swords className="h-3.5 w-3.5" />
              <span>Arena Battles</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("custom-benchmarks")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "custom-benchmarks" ? "text-accent-pink font-semibold bg-accent-pink/15 border border-accent-pink/30" : "text-muted hover:text-white"
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Custom Challenges</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("harness")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "harness" ? "text-accent-yellow font-semibold bg-accent-yellow/15 border border-accent-yellow/30" : "text-muted hover:text-white"
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>DeepSeek Harness</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("leaderboard")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "leaderboard" ? "text-white font-semibold bg-surface2" : "text-muted hover:text-white"
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Leaderboard</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("history")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs transition-colors ${
                currentPage === "history" ? "text-white font-semibold bg-surface2" : "text-muted hover:text-white"
              }`}
            >
              <History className="h-3.5 w-3.5" />
              <span>History</span>
            </button>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {/* BYOK Settings Trigger */}
          <button
            type="button"
            onClick={onOpenKeyModal}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted hover:text-white hover:border-borderStrong transition-colors"
            title="Configure API Keys (BYOK)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Key className="h-3.5 w-3.5 text-accent-yellow" />
            <span>{config.mode === "live" ? "Multi-LLM Live" : "BYOK"}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("new")}
            className="btn-primary h-9 px-4 text-xs"
          >
            <Swords className="h-3.5 w-3.5 text-accent" />
            <span>Start Match</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface2 text-muted md:hidden hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface p-6 md:hidden space-y-4">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("landing");
              }}
              className="block w-full text-left font-display text-sm text-muted hover:text-white"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("new");
              }}
              className="block w-full text-left font-display text-sm text-accent font-semibold hover:text-white"
            >
              Arena Battles
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("custom-benchmarks");
              }}
              className="block w-full text-left font-display text-sm text-accent-pink font-semibold hover:text-white"
            >
              Custom Challenges
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("harness");
              }}
              className="block w-full text-left font-display text-sm text-accent-yellow font-semibold hover:text-white"
            >
              DeepSeek Harness
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("leaderboard");
              }}
              className="block w-full text-left font-display text-sm text-muted hover:text-white"
            >
              Leaderboard
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("history");
              }}
              className="block w-full text-left font-display text-sm text-muted hover:text-white"
            >
              History &amp; Replays
            </button>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKeyModal();
              }}
              className="btn-secondary w-full"
            >
              <Key className="h-3.5 w-3.5 text-accent-yellow" />
              <span>Configure API Keys (BYOK)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("new");
              }}
              className="btn-primary w-full"
            >
              <Swords className="h-3.5 w-3.5 text-accent" />
              <span>Start Match</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
