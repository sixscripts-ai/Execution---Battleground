import React, { useState, useEffect } from "react";
import { LEADERBOARD_MODELS, ModelInfo } from "../data/models";
import { ARENA_FORMATS } from "../data/formats";
import { getCustomBenchmarks, CustomBenchmark } from "../services/customBenchmarkService";
import { checkOllamaStatus, LocalOllamaModel } from "../services/ollamaService";
import { Swords, ArrowRight, ShieldCheck, Zap, Terminal, Sparkles, Cpu, Clock3, Plus, HardDrive } from "lucide-react";

interface NewBattlePageProps {
  onStartBattle: (formatId: string, modelAId: string, modelBId: string) => void;
  onNavigate: (page: string) => void;
}

export const NewBattlePage: React.FC<NewBattlePageProps> = ({ onStartBattle, onNavigate }) => {
  const [selectedFormat, setSelectedFormat] = useState("security-ctf");
  const [modelA, setModelA] = useState("claude-3-7-sonnet");
  const [modelB, setModelB] = useState("deepseek-r1");
  const [timeout, setTimeoutVal] = useState(180);
  const [isLaunching, setIsLaunching] = useState(false);
  const [customBenchmarks, setCustomBenchmarks] = useState<CustomBenchmark[]>([]);
  const [ollamaOnline, setOllamaOnline] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<LocalOllamaModel[]>([]);

  // Load custom benchmarks and check local Ollama
  useEffect(() => {
    setCustomBenchmarks(getCustomBenchmarks());
    checkOllamaStatus().then((status) => {
      setOllamaOnline(status.isOnline);
      setOllamaModels(status.models);
    });
  }, []);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);
    setTimeout(() => {
      onStartBattle(selectedFormat, modelA, modelB);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-[1140px] px-4 py-12 sm:px-6">
      
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="c-tag text-accent-yellow mb-2.5">
            <span className="vector-4x4" />
            <span>Battle Creator</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Start a Live Agent Battle
          </h1>
          <p className="mt-1 text-sm text-muted">
            Choose a challenge format, pick competing AI models, and launch a real-time sandboxed evaluation.
          </p>
        </div>

        {/* Local Ollama Discovery Status Badge */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3 font-mono text-xs">
          <div className={`h-2 w-2 rounded-full ${ollamaOnline ? "bg-emerald-400 animate-pulse" : "bg-muted"}`} />
          <span className="text-white font-semibold">Local Ollama:</span>
          <span className={ollamaOnline ? "text-emerald-400" : "text-muted"}>
            {ollamaOnline ? `Online (${ollamaModels.length} models)` : "Offline (Cloud Active)"}
          </span>
        </div>
      </div>

      <form onSubmit={handleLaunch} className="space-y-8">
        
        {/* Step 1: Choose Benchmark Challenge */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-display text-base font-semibold text-white">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent/15 text-accent text-xs">1</span>
              <span>Select Challenge Format</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("custom-benchmarks")}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-accent hover:underline"
            >
              <Plus className="h-3 w-3" />
              <span>Create Custom Challenge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Standard Preset Formats */}
            {ARENA_FORMATS.map((f) => {
              const isSelected = selectedFormat === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all ${
                    isSelected
                      ? "border-accent bg-surface2 shadow-[0_0_20px_rgba(0,126,239,0.15)]"
                      : "border-border bg-[#0B0E12] hover:border-borderStrong"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-semibold text-sm text-white">{f.name}</span>
                    <span className="rounded bg-white/5 border border-border px-2 py-0.5 font-mono text-[9px] text-muted">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{f.description}</p>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] text-muted">
                    <span>{f.timeLimit} limit</span>
                    <span className="text-emerald-400">{f.statValue} {f.statLabel}</span>
                  </div>
                </div>
              );
            })}

            {/* Custom User Benchmarks */}
            {customBenchmarks.map((cb) => {
              const isSelected = selectedFormat === cb.id;
              return (
                <div
                  key={cb.id}
                  onClick={() => setSelectedFormat(cb.id)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all ${
                    isSelected
                      ? "border-accent-pink bg-surface2 shadow-[0_0_20px_rgba(245,141,227,0.15)]"
                      : "border-border bg-[#0B0E12] hover:border-borderStrong"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-accent-pink" />
                      {cb.title}
                    </span>
                    <span className="rounded bg-accent-pink/10 border border-accent-pink/30 px-2 py-0.5 font-mono text-[9px] text-accent-pink">
                      Custom
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{cb.description}</p>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] text-muted">
                    <span>{cb.timeoutSeconds}s limit</span>
                    <span className="text-accent-pink">{cb.difficulty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Competing Models */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2 font-display text-base font-semibold text-white mb-6">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent-pink/15 text-accent-pink text-xs">2</span>
            <span>Choose Competing Agents</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Model A */}
            <div className="rounded-xl border border-border bg-[#0B0E12] p-5">
              <label className="block font-display text-sm font-semibold text-white mb-2">
                Agent A (Defender / Builder)
              </label>
              <select
                value={modelA}
                onChange={(e) => setModelA(e.target.value)}
                className="w-full h-11 rounded-lg border border-border bg-surface px-3 font-mono text-xs text-white focus:border-accent focus:outline-none mb-3"
              >
                <optgroup label="Cloud Frontier Models">
                  {LEADERBOARD_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider} - ELO {m.elo})
                    </option>
                  ))}
                </optgroup>
                {ollamaModels.length > 0 && (
                  <optgroup label="Local Ollama Models">
                    {ollamaModels.map((om) => (
                      <option key={`local-${om.name}`} value={`local-${om.name}`}>
                        {om.name} (Local Ollama)
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
              <p className="text-xs text-muted">
                Role: <strong className="text-accent-pink">Builder</strong>. Inspects repository, drafts secure patches, and runs test assertions.
              </p>
            </div>

            {/* Model B */}
            <div className="rounded-xl border border-border bg-[#0B0E12] p-5">
              <label className="block font-display text-sm font-semibold text-white mb-2">
                Agent B (Challenger / Breaker)
              </label>
              <select
                value={modelB}
                onChange={(e) => setModelB(e.target.value)}
                className="w-full h-11 rounded-lg border border-border bg-surface px-3 font-mono text-xs text-white focus:border-accent focus:outline-none mb-3"
              >
                <optgroup label="Cloud Frontier Models">
                  {LEADERBOARD_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider} - ELO {m.elo})
                    </option>
                  ))}
                </optgroup>
                {ollamaModels.length > 0 && (
                  <optgroup label="Local Ollama Models">
                    {ollamaModels.map((om) => (
                      <option key={`local-${om.name}`} value={`local-${om.name}`}>
                        {om.name} (Local Ollama)
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
              <p className="text-xs text-muted">
                Role: <strong className="text-accent">Breaker</strong>. Generates fuzzing exploits, edge cases, and adversarial challenges.
              </p>
            </div>

          </div>
        </div>

        {/* Launch Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="btn-ghost"
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={isLaunching}
            className="btn-primary h-12 px-8 text-xs shadow-[0_0_30px_rgba(0,126,239,0.3)]"
          >
            <Swords className="h-4 w-4 text-accent" />
            <span>{isLaunching ? "Spinning MicroVMs..." : "Spawn Live Arena Session"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
