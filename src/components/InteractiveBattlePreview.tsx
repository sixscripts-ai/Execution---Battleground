import React, { useState } from "react";
import { SAMPLE_BATTLE, SimulatedBattleData } from "../data/battles";
import { 
  FileCode2, 
  GitCompare, 
  Terminal, 
  Wrench, 
  Layers, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  Trophy, 
  Clock3, 
  Radio, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Zap,
  Swords
} from "lucide-react";

export const InteractiveBattlePreview: React.FC = () => {
  const [battle, setBattle] = useState<SimulatedBattleData>(SAMPLE_BATTLE);
  const [selectedFormat, setSelectedFormat] = useState("security-ctf");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTabA, setActiveTabA] = useState<"artifact" | "diff" | "output" | "tools" | "versions">("artifact");
  const [activeTabB, setActiveTabB] = useState<"artifact" | "diff" | "output" | "tools" | "versions">("tools");
  const [selectedFileA, setSelectedFileA] = useState("work/authMiddleware.ts");
  const [selectedFileB, setSelectedFileB] = useState("fuzzer/exploit_probe.ts");
  const [copiedA, setCopiedA] = useState(false);
  const [copiedB, setCopiedB] = useState(false);
  const [simStep, setSimStep] = useState(3);

  const handleCopy = (text: string, isA: boolean) => {
    navigator.clipboard.writeText(text);
    if (isA) {
      setCopiedA(true);
      setTimeout(() => setCopiedA(false), 1500);
    } else {
      setCopiedB(true);
      setTimeout(() => setCopiedB(false), 1500);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimStep(1);
    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsSimulating(false);
          return 3;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleReset = () => {
    setSimStep(3);
    setIsSimulating(false);
  };

  return (
    <section id="battle-preview" className="relative border-b border-border bg-[#0B0D10] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="c-tag text-accent-yellow mb-2.5">
              <span className="vector-4x4" />
              <span>Interactive Dual-Agent Inspector</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Watch Agents Battle in Live Sandboxes
            </h2>
            <p className="mt-1 text-sm text-muted max-w-xl">
              Inspect multi-agent code generation, live AST diffs, structured sandbox tool calls, and deterministic judge evaluation in real-time.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface2 p-1">
              <button
                type="button"
                onClick={() => setSelectedFormat("security-ctf")}
                className={`rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                  selectedFormat === "security-ctf" ? "bg-accent text-white" : "text-muted hover:text-white"
                }`}
              >
                Security CTF
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat("feature-race")}
                className={`rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                  selectedFormat === "feature-race" ? "bg-accent text-white" : "text-muted hover:text-white"
                }`}
              >
                Feature Race
              </button>
            </div>

            <button
              type="button"
              onClick={handleSimulate}
              disabled={isSimulating}
              className="btn-primary h-8 px-3 text-[10px]"
            >
              <Play className={`h-3 w-3 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Evaluating..." : "Replay Match"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary h-8 px-2.5 text-[10px]"
              title="Reset state"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Live Arena Inspector Window */}
        <div className="rounded-xl border border-borderStrong bg-surface shadow-2xl overflow-hidden">
          
          {/* Window Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#0E1217] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {battle.status}
              </span>
              <span className="font-mono text-[11px] font-semibold text-white">
                {battle.id}
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-muted">
                Format: <strong className="text-codeFg">{battle.format_name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
              <span className="hidden md:flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {battle.timeout_seconds}s limit
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-accent-yellow" />
                Phase {simStep}/3: Hardening
              </span>
            </div>
          </div>

          {/* Dual Agent Grid */}
          <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            
            {/* Agent A: Claude 3.7 Sonnet (Builder) */}
            <div className="flex flex-col h-[580px] bg-code">
              
              {/* Agent A Header */}
              <div className="flex min-h-[56px] items-center justify-between border-b border-codeBorder bg-surface px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded bg-accent-pink/10 border border-accent-pink/30 font-mono text-xs font-bold text-accent-pink">
                    C
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{battle.modelA.name}</span>
                      <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-accent border border-accent/20">
                        {battle.modelA.role}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-muted uppercase tracking-wider">
                      {battle.modelA.tokensPerSec} · ELO {battle.modelA.elo}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(battle.modelA.currentArtifact, true)}
                    className="grid h-7 w-7 place-items-center rounded border border-border bg-surface2 text-muted hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copiedA ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[8px] uppercase text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    live
                  </span>
                </div>
              </div>

              {/* Tabs Bar */}
              <div className="flex items-center justify-between border-b border-codeBorder bg-[#0A0D11] px-2 py-1">
                <div className="flex items-center gap-1 overflow-x-auto" role="tablist">
                  {[
                    { id: "artifact", label: "Artifact", icon: FileCode2 },
                    { id: "diff", label: "Diff", icon: GitCompare },
                    { id: "output", label: "Output", icon: Terminal },
                    { id: "tools", label: "Tools (3)", icon: Wrench },
                    { id: "versions", label: "Versions (3)", icon: Layers },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTabA === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabA(tab.id as any)}
                        className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                          isActive ? "bg-surface text-white border border-border" : "text-muted hover:text-white"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content Panel */}
              <div className="flex-1 overflow-auto p-0 font-mono text-xs">
                {activeTabA === "artifact" && (
                  <div className="flex h-full">
                    {/* File sidebar */}
                    <div className="w-36 border-r border-codeBorder bg-[#080A0D] p-2 space-y-1 hidden sm:block">
                      <div className="text-[8px] uppercase tracking-[0.14em] text-muted mb-2 px-1">Files</div>
                      {Object.keys(battle.modelA.files).map((file) => (
                        <button
                          key={file}
                          type="button"
                          onClick={() => setSelectedFileA(file)}
                          className={`w-full text-left truncate rounded px-2 py-1 text-[9px] transition-colors ${
                            selectedFileA === file ? "bg-accent/15 text-accent font-semibold" : "text-muted hover:text-codeFg"
                          }`}
                        >
                          {file.split("/")[1] || file}
                        </button>
                      ))}
                    </div>
                    {/* Code display */}
                    <div className="flex-1 overflow-auto p-3 bg-code">
                      <pre className="text-[11px] leading-5 text-codeFg">
                        <code>{battle.modelA.files[selectedFileA] || battle.modelA.currentArtifact}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTabA === "diff" && (
                  <div className="p-3 space-y-1 text-[10px]">
                    <div className="flex items-center justify-between border-b border-codeBorder pb-2 text-[9px] uppercase text-muted">
                      <span>v2 → v3 Hardening Patch</span>
                      <span className="text-emerald-400">+14 additions / -4 deletions</span>
                    </div>
                    <div className="bg-emerald-500/10 border-l-2 border-emerald-500 p-2 text-emerald-300">
                      + const sigBuffer = Buffer.from(signatureHex, &quot;utf8&quot;);<br />
                      + const expectedBuffer = Buffer.from(expectedSig, &quot;utf8&quot;);<br />
                      + if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;
                    </div>
                    <div className="bg-red-500/10 border-l-2 border-red-500 p-2 text-red-300 line-through">
                      - if (signatureHex !== expectedSig) return null; // Vulnerable to timing attack
                    </div>
                  </div>
                )}

                {activeTabA === "tools" && (
                  <div className="p-3 space-y-2">
                    {battle.modelA.toolCalls.map((call, idx) => (
                      <div key={idx} className="rounded border border-codeBorder bg-surface p-2.5 text-[9px]">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-accent-pink font-semibold">{call.action}</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {call.state} · {call.duration}
                          </span>
                        </div>
                        <div className="text-muted mt-1">{call.target}</div>
                        <div className="text-codeFg/80 mt-1 bg-code p-1.5 rounded">{call.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTabA === "output" && (
                  <div className="p-3 font-mono text-[10px] space-y-1 text-codeFg">
                    <div className="text-muted">[14:33:10] Executing security test suite in isolated MicroVM #92...</div>
                    <div className="text-emerald-400">✓ AST Syntax Verification: Validated</div>
                    <div className="text-emerald-400">✓ CWE-208 Timing Attack Defense: Protected (Δt &lt; 0.04μs)</div>
                    <div className="text-emerald-400">✓ Sliding Window Rate Limiter: 100/100 requests throttled</div>
                    <div className="text-accent mt-2">=== Final Score: 98.4 / 100 ===</div>
                  </div>
                )}

                {activeTabA === "versions" && (
                  <div className="p-3 space-y-2">
                    {battle.modelA.versions.map((ver) => (
                      <div key={ver.version} className="rounded border border-codeBorder bg-surface p-2.5 text-[9px]">
                        <div className="flex items-center justify-between text-codeFg font-semibold">
                          <span>v{ver.version} — {ver.phase}</span>
                          <span className="text-muted">{ver.timestamp}</span>
                        </div>
                        <p className="text-muted mt-1">{ver.artifactSummary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent A Footer Status */}
              <div className="flex min-h-[40px] items-center justify-between border-t border-codeBorder bg-surface px-4 py-1.5 text-[10px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Score: {battle.modelA.score}/100
                </span>
                <span className="text-accent-yellow font-bold">
                  +{battle.modelA.deltaElo} ELO (Rank #1)
                </span>
              </div>
            </div>

            {/* Agent B: DeepSeek R1 (Breaker) */}
            <div className="flex flex-col h-[580px] bg-code">
              
              {/* Agent B Header */}
              <div className="flex min-h-[56px] items-center justify-between border-b border-codeBorder bg-surface px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent">
                    D
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{battle.modelB.name}</span>
                      <span className="rounded bg-accent-pink/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-accent-pink border border-accent-pink/20">
                        {battle.modelB.role}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-muted uppercase tracking-wider">
                      {battle.modelB.tokensPerSec} · ELO {battle.modelB.elo}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(battle.modelB.currentArtifact, false)}
                    className="grid h-7 w-7 place-items-center rounded border border-border bg-surface2 text-muted hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copiedB ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[8px] uppercase text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-pink" />
                    attacker
                  </span>
                </div>
              </div>

              {/* Tabs Bar */}
              <div className="flex items-center justify-between border-b border-codeBorder bg-[#0A0D11] px-2 py-1">
                <div className="flex items-center gap-1 overflow-x-auto" role="tablist">
                  {[
                    { id: "tools", label: "Tools (2)", icon: Wrench },
                    { id: "artifact", label: "Artifact", icon: FileCode2 },
                    { id: "diff", label: "Diff", icon: GitCompare },
                    { id: "output", label: "Output", icon: Terminal },
                    { id: "versions", label: "Versions (2)", icon: Layers },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTabB === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabB(tab.id as any)}
                        className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                          isActive ? "bg-surface text-white border border-border" : "text-muted hover:text-white"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content Panel */}
              <div className="flex-1 overflow-auto p-0 font-mono text-xs">
                {activeTabB === "tools" && (
                  <div className="p-3 space-y-2">
                    {battle.modelB.toolCalls.map((call, idx) => (
                      <div key={idx} className="rounded border border-codeBorder bg-surface p-2.5 text-[9px]">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-accent font-semibold">{call.action}</span>
                          <span className={`flex items-center gap-1 ${call.state === "ok" ? "text-emerald-400" : "text-red-400"}`}>
                            {call.state === "ok" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {call.state} · {call.duration}
                          </span>
                        </div>
                        <div className="text-muted mt-1">{call.target}</div>
                        <div className="text-codeFg/80 mt-1 bg-code p-1.5 rounded">{call.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTabB === "artifact" && (
                  <div className="flex h-full">
                    <div className="w-36 border-r border-codeBorder bg-[#080A0D] p-2 space-y-1 hidden sm:block">
                      <div className="text-[8px] uppercase tracking-[0.14em] text-muted mb-2 px-1">Fuzzer files</div>
                      {Object.keys(battle.modelB.files).map((file) => (
                        <button
                          key={file}
                          type="button"
                          onClick={() => setSelectedFileB(file)}
                          className={`w-full text-left truncate rounded px-2 py-1 text-[9px] transition-colors ${
                            selectedFileB === file ? "bg-accent/15 text-accent font-semibold" : "text-muted hover:text-codeFg"
                          }`}
                        >
                          {file.split("/")[1] || file}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 overflow-auto p-3 bg-code">
                      <pre className="text-[11px] leading-5 text-codeFg">
                        <code>{battle.modelB.files[selectedFileB] || battle.modelB.currentArtifact}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTabB === "output" && (
                  <div className="p-3 font-mono text-[10px] space-y-1 text-codeFg">
                    <div className="text-muted">[14:33:12] Breaker dispatching 1,000 exploit vectors...</div>
                    <div className="text-yellow-400">⚠ Phase 1: High rate requests throttled (429 Too Many Requests)</div>
                    <div className="text-red-400">✗ Phase 2: Timing side-channel defeated by timingSafeEqual</div>
                    <div className="text-muted mt-2">Exploit penetration failed: 0 zero-day leaks detected.</div>
                  </div>
                )}

                {activeTabB === "diff" && (
                  <div className="p-3 space-y-1 text-[10px]">
                    <div className="flex items-center justify-between border-b border-codeBorder pb-2 text-[9px] uppercase text-muted">
                      <span>v1 → v2 Fuzzing Probe</span>
                      <span className="text-accent">+8 additions / -2 deletions</span>
                    </div>
                    <div className="bg-accent/10 border-l-2 border-accent p-2 text-accent-cyan">
                      + const variance = timings.map(t =&gt; Math.abs(Number(t.latencyNs) - avg));<br />
                      + const maxDelta = Math.max(...variance);
                    </div>
                  </div>
                )}

                {activeTabB === "versions" && (
                  <div className="p-3 space-y-2">
                    {battle.modelB.versions.map((ver) => (
                      <div key={ver.version} className="rounded border border-codeBorder bg-surface p-2.5 text-[9px]">
                        <div className="flex items-center justify-between text-codeFg font-semibold">
                          <span>v{ver.version} — {ver.phase}</span>
                          <span className="text-muted">{ver.timestamp}</span>
                        </div>
                        <p className="text-muted mt-1">{ver.artifactSummary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent B Footer Status */}
              <div className="flex min-h-[40px] items-center justify-between border-t border-codeBorder bg-surface px-4 py-1.5 text-[10px] font-mono">
                <span className="text-muted flex items-center gap-1">
                  Score: {battle.modelB.score}/100
                </span>
                <span className="text-danger font-bold">
                  {battle.modelB.deltaElo} ELO
                </span>
              </div>
            </div>

          </div>

          {/* Judge Verdict Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-[#0E1217] p-4 text-xs">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent-yellow" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Deterministic Judge Verdict:
              </span>
              <span className="font-semibold text-white">
                Claude 3.7 Sonnet wins by +16.3 pts (AST + Zero Leakage)
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
              <span>Verified Test Hash: 0x8f2d..39a</span>
              <span className="h-3 w-px bg-border" />
              <span className="text-emerald-400">100% Deterministic</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
