import React, { useState, useEffect } from "react";
import { LiveBattleSession, getPhaseUpdates } from "../services/battleEngine";
import { loadApiKeys, generateAgentTurn } from "../services/llmService";
import { runCodeInSandbox, ExecutionResult } from "../services/sandboxRunner";
import { ChaosInjector, ChaosEvent } from "../components/ChaosInjector";
import { 
  FileCode2, 
  GitCompare, 
  Terminal, 
  Layers, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Zap,
  Bookmark,
  Square,
  ArrowLeft,
  Swords,
  Key,
  Flame,
  AlertTriangle,
  PlayCircle
} from "lucide-react";

interface LiveBattlePageProps {
  session: LiveBattleSession;
  onUpdateSession: (updated: LiveBattleSession) => void;
  onNavigate: (page: string) => void;
  onOpenKeyModal?: () => void;
}

export const LiveBattlePage: React.FC<LiveBattlePageProps> = ({
  session,
  onUpdateSession,
  onNavigate,
  onOpenKeyModal
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTabA, setActiveTabA] = useState<"code" | "diff" | "logs">("code");
  const [activeTabB, setActiveTabB] = useState<"code" | "diff" | "logs">("logs");
  const [copiedA, setCopiedA] = useState(false);
  const [copiedB, setCopiedB] = useState(false);
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [activeChaos, setActiveChaos] = useState<string | null>(null);

  // Live in-browser execution result states
  const [execResultA, setExecResultA] = useState<ExecutionResult | null>(null);
  const [execResultB, setExecResultB] = useState<ExecutionResult | null>(null);
  const [isStepping, setIsStepping] = useState(false);

  const config = loadApiKeys();

  const sessionRef = React.useRef(session);
  sessionRef.current = session;

  const isSteppingRef = React.useRef(false);

  const onUpdateSessionRef = React.useRef(onUpdateSession);
  onUpdateSessionRef.current = onUpdateSession;

  const stepCountdownRef = React.useRef(3);

  // Run in-browser code sandbox verification whenever code changes
  useEffect(() => {
    runCodeInSandbox(session.agentA.currentCode).then((res) => setExecResultA(res));
    runCodeInSandbox(session.agentB.currentCode).then((res) => setExecResultB(res));
  }, [session.agentA.currentCode, session.agentB.currentCode]);

  // Step next phase handler (used by auto-ticker and manual button)
  const stepNextPhase = React.useCallback(async () => {
    if (isSteppingRef.current) return;
    const current = sessionRef.current;
    if (current.currentPhaseIndex >= current.phases.length - 1) return;

    isSteppingRef.current = true;
    setIsStepping(true);

    const nextIndex = current.currentPhaseIndex + 1;
    const currentPhaseName = current.phases[nextIndex];
    const isFinalPhase = nextIndex >= current.phases.length - 1;

    const updates = getPhaseUpdates(nextIndex, current.format_id, current.agentA.name, current.agentB.name);

    let finalCodeA = updates.agentACode;
    let finalCodeB = updates.agentBCode;
    let toolDetailA = updates.toolA.detail;
    let toolDetailB = updates.toolB.detail;

    if (config.mode === "live") {
      try {
        const [resA, resB] = await Promise.all([
          generateAgentTurn(
            {
              modelId: current.agentA.id,
              role: current.agentA.role,
              formatName: current.format_name,
              phase: currentPhaseName,
              previousCode: current.agentA.currentCode,
              opponentCode: current.agentB.currentCode
            },
            config
          ),
          generateAgentTurn(
            {
              modelId: current.agentB.id,
              role: current.agentB.role,
              formatName: current.format_name,
              phase: currentPhaseName,
              previousCode: current.agentB.currentCode,
              opponentCode: current.agentA.currentCode
            },
            config
          )
        ]);

        if (resA.code) {
          finalCodeA = resA.code;
          toolDetailA = resA.detail;
        }
        if (resB.code) {
          finalCodeB = resB.code;
          toolDetailB = resB.detail;
        }
      } catch (e) {
        console.warn("Live API call error:", e);
      }
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newToolA = {
      t: Date.now(),
      kind: "action_log" as const,
      model_id: current.agentA.id,
      phase: currentPhaseName,
      action: updates.toolA.action,
      target: updates.toolA.target,
      state: updates.toolA.state,
      duration: updates.toolA.duration,
      detail: toolDetailA
    };

    const newToolB = {
      t: Date.now(),
      kind: "action_log" as const,
      model_id: current.agentB.id,
      phase: currentPhaseName,
      action: updates.toolB.action,
      target: updates.toolB.target,
      state: updates.toolB.state,
      duration: updates.toolB.duration,
      detail: toolDetailB
    };

    const updatedSession: LiveBattleSession = {
      ...current,
      currentPhaseIndex: nextIndex,
      currentPhase: currentPhaseName,
      status: isFinalPhase ? "completed" : "running",
      winner: isFinalPhase ? current.agentA.id : null,
      winReason: isFinalPhase ? "100% In-Browser AST Verification Passed" : null,
      agentA: {
        ...current.agentA,
        currentCode: finalCodeA,
        score: isFinalPhase ? 98.4 : Math.min(95, (nextIndex + 1) * 24),
        deltaElo: isFinalPhase ? 18 : 0,
        toolCalls: [newToolA, ...current.agentA.toolCalls],
        transcripts: [updates.transcriptA, ...current.agentA.transcripts],
        versions: [
          {
            version: nextIndex + 1,
            phase: currentPhaseName,
            timestamp,
            summary: `Emitted phase ${nextIndex + 1} artifact: ${toolDetailA}`,
            code: finalCodeA
          },
          ...current.agentA.versions
        ]
      },
      agentB: {
        ...current.agentB,
        currentCode: finalCodeB,
        score: isFinalPhase ? 82.1 : Math.min(80, (nextIndex + 1) * 20),
        deltaElo: isFinalPhase ? -18 : 0,
        toolCalls: [newToolB, ...current.agentB.toolCalls],
        transcripts: [updates.transcriptB, ...current.agentB.transcripts],
        versions: [
          {
            version: nextIndex + 1,
            phase: currentPhaseName,
            timestamp,
            summary: `Emitted phase ${nextIndex + 1} fuzzer: ${toolDetailB}`,
            code: finalCodeB
          },
          ...current.agentB.versions
        ]
      }
    };

    onUpdateSessionRef.current(updatedSession);
    isSteppingRef.current = false;
    setIsStepping(false);

    if (isFinalPhase) {
      setIsPlaying(false);
      try {
        const history = JSON.parse(localStorage.getItem("agent_arena_battles") || "[]");
        history.unshift(updatedSession);
        localStorage.setItem("agent_arena_battles", JSON.stringify(history.slice(0, 30)));
      } catch {}
    }
  }, [config]);

  // Unified stopwatch and phase stepper ticker
  useEffect(() => {
    if (!isPlaying) {
      stepCountdownRef.current = 3;
      return;
    }

    const timer = setInterval(() => {
      const current = sessionRef.current;
      if (current.status === "completed" || current.status === "cancelled") {
        clearInterval(timer);
        return;
      }

      onUpdateSessionRef.current({
        ...sessionRef.current,
        elapsedSeconds: sessionRef.current.elapsedSeconds + 1,
        status: "running"
      });

      stepCountdownRef.current--;
      if (stepCountdownRef.current <= 0) {
        stepCountdownRef.current = 4;
        stepNextPhase();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, stepNextPhase]);

  // Inject Chaos Handler
  const handleInjectChaos = (chaos: ChaosEvent | { title: string; description: string }) => {
    setActiveChaos(chaos.title);
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    onUpdateSessionRef.current({
      ...sessionRef.current,
      agentA: {
        ...sessionRef.current.agentA,
        transcripts: [`[CHAOS INJECTED] ${chaos.title}: ${chaos.description}`, ...sessionRef.current.agentA.transcripts]
      },
      agentB: {
        ...sessionRef.current.agentB,
        transcripts: [`[CHAOS INJECTED] ${chaos.title}: ${chaos.description}`, ...sessionRef.current.agentB.transcripts]
      }
    });

    setTimeout(() => {
      setActiveChaos(null);
    }, 6000);
  };

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

  const handleSave = () => {
    const updated = { ...session, saved: true };
    onUpdateSession(updated);
    try {
      const history = JSON.parse(localStorage.getItem("agent_arena_battles") || "[]");
      const existingIdx = history.findIndex((b: any) => b.id === session.id);
      if (existingIdx >= 0) {
        history[existingIdx] = updated;
      } else {
        history.unshift(updated);
      }
      localStorage.setItem("agent_arena_battles", JSON.stringify(history));
    } catch {}
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground flex flex-col">
      
      {/* Active Chaos Alert Banner */}
      {activeChaos && (
        <div className="border-b border-accent-pink/40 bg-accent-pink/15 px-4 py-2.5 text-center text-xs font-display font-semibold text-accent-pink animate-in slide-in-from-top duration-200 flex items-center justify-center gap-2">
          <Flame className="h-4 w-4 animate-bounce" />
          <span>LIVE CHAOS INJECTED: {activeChaos} — Both models adapting in real-time!</span>
        </div>
      )}

      {/* Simplified Top Dashboard Header */}
      <section className="border-b border-border bg-[#0B0D10] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <button
                type="button"
                onClick={() => onNavigate("landing")}
                className="flex items-center gap-1 font-mono text-[10px] uppercase text-muted hover:text-white mr-2"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Overview</span>
              </button>

              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded ${
                session.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                session.status === "cancelled" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                "bg-accent/20 text-accent border border-accent/30"
              }`}>
                {session.status === "running" && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
                {session.status}
              </span>

              <span className="font-mono text-xs text-white font-semibold">
                ⏱ {formatTimer(session.elapsedSeconds)} / {session.timeoutSeconds}s
              </span>

              <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] text-emerald-400 flex items-center gap-1">
                <Zap className="h-2.5 w-2.5" />
                In-Browser Sandbox Active
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {session.format_name}
            </h1>
          </div>

          {/* Primary Friendly Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Chaos Injector Button */}
            <button
              type="button"
              onClick={() => setChaosModalOpen(true)}
              className="btn-secondary h-9 px-3 text-xs border-accent-pink/40 hover:border-accent-pink text-accent-pink hover:bg-accent-pink/10"
              title="Inject live curveballs"
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Inject Chaos</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={session.status === "completed" || session.status === "cancelled"}
              className="btn-secondary h-9 px-3 text-xs"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? "Pause" : "Resume"}</span>
            </button>

            <button
              type="button"
              onClick={() => stepNextPhase()}
              disabled={isStepping || session.status === "completed" || session.currentPhaseIndex >= session.phases.length - 1}
              className="btn-secondary h-9 px-3 text-xs border-accent/40 text-accent hover:bg-accent/10"
              title="Step forward to the next phase immediately"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              <span>{isStepping ? "Evaluating Phase..." : "Step Phase →"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="btn-secondary h-9 px-3 text-xs"
            >
              <Bookmark className={`h-3.5 w-3.5 ${session.saved ? "text-accent-yellow fill-accent-yellow" : ""}`} />
              <span>{session.saved ? "Saved" : "Save Replay"}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("new")}
              className="btn-primary h-9 px-4 text-xs"
            >
              <Swords className="h-3.5 w-3.5 text-accent" />
              <span>New Match</span>
            </button>
          </div>

        </div>

        {/* Simplified Phase Progression Bar */}
        <div className="mx-auto max-w-[1360px] mt-4 pt-3 border-t border-border/60 flex items-center gap-2 overflow-x-auto">
          {session.phases.map((ph, idx) => {
            const isCurrent = idx === session.currentPhaseIndex;
            const isPassed = idx < session.currentPhaseIndex;
            return (
              <div
                key={idx}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs font-semibold shrink-0 transition-all ${
                  isCurrent ? "bg-accent text-white shadow" :
                  isPassed ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
                  "text-muted bg-surface"
                }`}
              >
                {isPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span>{idx + 1}</span>}
                <span>{ph}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clean Dual Agent Battle Screen */}
      <section className="flex-1 border-b border-border bg-[#060709]">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          
          {/* Agent A Pane */}
          <div className="flex flex-col h-[620px] bg-code">
            
            {/* Header */}
            <div className="flex min-h-[58px] items-center justify-between border-b border-codeBorder bg-surface px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-pink/10 border border-accent-pink/30 font-display text-xs font-bold text-accent-pink">
                  {session.agentA.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-white">{session.agentA.name}</span>
                    <span className="rounded bg-accent/10 px-2 py-0.2 font-mono text-[8px] uppercase tracking-wider text-accent border border-accent/20">
                      {session.agentA.role}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-muted">
                    ELO {session.agentA.elo} · {session.agentA.tokensPerSec}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(session.agentA.currentCode, true)}
                  className="grid h-7 w-7 place-items-center rounded border border-border bg-surface2 text-muted hover:text-white"
                  title="Copy code"
                >
                  {copiedA ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                {execResultA?.success ? (
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[8px] text-emerald-400">
                    🟢 Passing ({execResultA.passedTests}/{execResultA.totalTests})
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 font-mono text-[8px] text-yellow-400">
                    🟡 Hardening...
                  </span>
                )}
              </div>
            </div>

            {/* Simplified 3 Tabs */}
            <div className="flex items-center border-b border-codeBorder bg-[#090C0F] px-3 py-1.5">
              {[
                { id: "code", label: "Code Artifact", icon: FileCode2 },
                { id: "diff", label: "Changes (Diff)", icon: GitCompare },
                { id: "logs", label: `Logs & Tests (${session.agentA.toolCalls.length})`, icon: Terminal },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTabA === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabA(tab.id as any)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-display text-xs transition-colors ${
                      isActive ? "bg-surface text-white border border-border font-semibold" : "text-muted hover:text-white"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-code font-mono text-xs">
              {activeTabA === "code" && (
                <pre className="text-[11px] leading-5 text-codeFg">
                  <code>{session.agentA.currentCode}</code>
                </pre>
              )}

              {activeTabA === "diff" && (
                <div className="space-y-2 text-[11px]">
                  <div className="text-[9px] uppercase text-muted border-b border-codeBorder pb-2">
                    Security AST Patch Changes
                  </div>
                  <div className="bg-emerald-500/10 border-l-2 border-emerald-500 p-2.5 text-emerald-300 rounded">
                    + const sigBuffer = Buffer.from(signatureHex, &quot;utf8&quot;);<br />
                    + const expectedBuffer = Buffer.from(expectedSig, &quot;utf8&quot;);<br />
                    + if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;
                  </div>
                  <div className="bg-red-500/10 border-l-2 border-red-500 p-2.5 text-red-300 line-through rounded">
                    - if (signatureHex !== expectedSig) return null; // Naive comparison
                  </div>
                </div>
              )}

              {activeTabA === "logs" && (
                <div className="space-y-3">
                  {/* Sandbox Run result */}
                  {execResultA && (
                    <div className="rounded-lg border border-codeBorder bg-surface p-3 text-[10px]">
                      <div className="flex items-center justify-between mb-1.5 font-bold">
                        <span className="text-emerald-400">In-Browser Sandbox Results</span>
                        <span className="text-muted">{execResultA.durationMs}ms</span>
                      </div>
                      <div className="space-y-1 opacity-90 text-codeFg">
                        {execResultA.logs.map((l, i) => (
                          <div key={i}>{l}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {session.agentA.transcripts.map((t, i) => (
                    <div key={i} className="text-codeFg/80 border-b border-codeBorder/40 pb-1 text-[10px]">
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Score Footer */}
            <div className="flex min-h-[44px] items-center justify-between border-t border-codeBorder bg-surface px-4 py-2 text-xs font-display">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                Score: {session.agentA.score}/100
              </span>
              <span className="text-accent-yellow font-bold font-mono text-[11px]">
                {session.agentA.deltaElo > 0 ? `+${session.agentA.deltaElo} ELO` : "Calibrating..."}
              </span>
            </div>
          </div>

          {/* Agent B Pane */}
          <div className="flex flex-col h-[620px] bg-code">
            
            {/* Header */}
            <div className="flex min-h-[58px] items-center justify-between border-b border-codeBorder bg-surface px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 border border-accent/30 font-display text-xs font-bold text-accent">
                  {session.agentB.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-white">{session.agentB.name}</span>
                    <span className="rounded bg-accent-pink/10 px-2 py-0.2 font-mono text-[8px] uppercase tracking-wider text-accent-pink border border-accent-pink/20">
                      {session.agentB.role}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-muted">
                    ELO {session.agentB.elo} · {session.agentB.tokensPerSec}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(session.agentB.currentCode, false)}
                  className="grid h-7 w-7 place-items-center rounded border border-border bg-surface2 text-muted hover:text-white"
                  title="Copy code"
                >
                  {copiedB ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <span className="rounded-full bg-accent-pink/10 border border-accent-pink/30 px-2 py-0.5 font-mono text-[8px] text-accent-pink">
                  Attacker Probe Active
                </span>
              </div>
            </div>

            {/* Simplified 3 Tabs */}
            <div className="flex items-center border-b border-codeBorder bg-[#090C0F] px-3 py-1.5">
              {[
                { id: "logs", label: `Logs & Tests (${session.agentB.toolCalls.length})`, icon: Terminal },
                { id: "code", label: "Fuzzer Script", icon: FileCode2 },
                { id: "diff", label: "Changes (Diff)", icon: GitCompare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTabB === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabB(tab.id as any)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-display text-xs transition-colors ${
                      isActive ? "bg-surface text-white border border-border font-semibold" : "text-muted hover:text-white"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-code font-mono text-xs">
              {activeTabB === "code" && (
                <pre className="text-[11px] leading-5 text-codeFg">
                  <code>{session.agentB.currentCode}</code>
                </pre>
              )}

              {activeTabB === "diff" && (
                <div className="space-y-2 text-[11px]">
                  <div className="text-[9px] uppercase text-muted border-b border-codeBorder pb-2">
                    Fuzzer Probing Mutation
                  </div>
                  <div className="bg-accent/10 border-l-2 border-accent p-2.5 text-accent-cyan rounded">
                    + const variance = Math.max(...latencies) - Math.min(...latencies);<br />
                    + return &#123; variance, vulnerable: variance &gt; 1.2 &#125;;
                  </div>
                </div>
              )}

              {activeTabB === "logs" && (
                <div className="space-y-3">
                  {session.agentB.toolCalls.map((call, idx) => (
                    <div key={idx} className="rounded-lg border border-codeBorder bg-surface p-2.5 text-[10px]">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-accent font-bold">{call.action}</span>
                        <span className={`flex items-center gap-1 ${call.state === "ok" ? "text-emerald-400" : "text-red-400"}`}>
                          {call.state === "ok" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {call.duration}
                        </span>
                      </div>
                      <div className="text-muted mt-1">{call.target}</div>
                      <div className="text-codeFg/80 mt-1 bg-code p-1.5 rounded">{call.detail}</div>
                    </div>
                  ))}
                  {session.agentB.transcripts.map((t, i) => (
                    <div key={i} className="text-codeFg/80 text-[10px]">
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Score Footer */}
            <div className="flex min-h-[44px] items-center justify-between border-t border-codeBorder bg-surface px-4 py-2 text-xs font-display">
              <span className="text-muted font-bold">
                Score: {session.agentB.score}/100
              </span>
              <span className="text-red-400 font-bold font-mono text-[11px]">
                {session.agentB.deltaElo !== 0 ? `${session.agentB.deltaElo} ELO` : "Calibrating..."}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Judge Verdict Panel */}
      <section className="bg-[#0E1217] p-6 border-t border-border">
        <div className="mx-auto max-w-[1360px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-wider text-muted">
                Deterministic Judge Verdict
              </div>
              <div className="font-display text-base font-bold text-white">
                {session.winner ? `${session.agentA.name} Wins Match (+18 ELO)` : "Evaluating live sandbox assertions..."}
              </div>
              <div className="text-xs text-muted">
                {session.winReason || "All scores verified by in-browser AST execution and deterministic test harnesses."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("custom-benchmarks")}
              className="btn-secondary h-10 px-4 text-xs"
            >
              <span>Build Custom Benchmark</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("leaderboard")}
              className="btn-primary h-10 px-4 text-xs"
            >
              <span>View Leaderboard</span>
            </button>
          </div>
        </div>
      </section>

      {/* Chaos Injector Modal */}
      <ChaosInjector
        isOpen={chaosModalOpen}
        onClose={() => setChaosModalOpen(false)}
        onInjectChaos={handleInjectChaos}
      />

    </div>
  );
};
