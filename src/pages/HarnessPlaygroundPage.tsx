import React, { useState, useEffect } from "react";
import { 
  initHarnessTask, 
  stepHarness, 
  HarnessTaskRun, 
  HARNESS_PRESET_TASKS,
  HARNESS_TOOLS 
} from "../services/deepseekHarness";
import { 
  Terminal, 
  Cpu, 
  Wrench, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  FileCode2, 
  GitCompare, 
  Zap, 
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Key
} from "lucide-react";

interface HarnessPlaygroundProps {
  onNavigate: (page: string) => void;
}

export const HarnessPlaygroundPage: React.FC<HarnessPlaygroundProps> = ({ onNavigate }) => {
  const [selectedPreset, setSelectedPreset] = useState("cwe-208-timing-attack");
  const [task, setTask] = useState<HarnessTaskRun>(() => initHarnessTask("cwe-208-timing-attack"));
  const [isRunningAuto, setIsRunningAuto] = useState(false);
  const [activeTab, setActiveTab] = useState<"loop" | "workspace" | "diff" | "terminal">("loop");
  const [selectedFile, setSelectedFile] = useState("src/auth.ts");

  const taskRef = React.useRef(task);
  taskRef.current = task;
  const isSteppingRef = React.useRef(false);

  // Preset switch
  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    setTask(initHarnessTask(presetId));
    setIsRunningAuto(false);
  };

  // Step next action
  const handleStep = async () => {
    if (isSteppingRef.current || taskRef.current.status === "completed") return;
    isSteppingRef.current = true;
    try {
      const nextState = await stepHarness(taskRef.current);
      setTask(nextState);
    } finally {
      isSteppingRef.current = false;
    }
  };

  // Auto-play loop
  useEffect(() => {
    if (!isRunningAuto) return;
    const interval = setInterval(async () => {
      const current = taskRef.current;
      if (current.status === "completed" || current.currentStep >= current.maxSteps) {
        setIsRunningAuto(false);
        clearInterval(interval);
        return;
      }
      if (!isSteppingRef.current) {
        isSteppingRef.current = true;
        try {
          const nextState = await stepHarness(current);
          setTask(nextState);
          if (nextState.status === "completed" || nextState.currentStep >= nextState.maxSteps) {
            setIsRunningAuto(false);
          }
        } finally {
          isSteppingRef.current = false;
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunningAuto]);

  const handleReset = () => {
    setIsRunningAuto(false);
    setTask(initHarnessTask(selectedPreset));
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="c-tag text-accent">
              <span className="vector-4x4" />
              <span>DeepSeek Harness Agent Runtime</span>
            </div>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] text-emerald-400 flex items-center gap-1">
              <Zap className="h-2.5 w-2.5" />
              Live Groq LPU Token Calling Active
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            DeepSeek Harness Playground
          </h1>
          <p className="mt-2 text-sm text-muted max-w-2xl">
            Live execution loop dispatching real tool-calling tokens to <strong className="text-white">openai/gpt-oss-120b</strong> on Groq. Watch real-time reasoning, tool invocation, and sandbox AST patching.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRunningAuto(!isRunningAuto)}
            disabled={task.status === "completed"}
            className="btn-primary h-11 px-5 text-xs shadow-[0_0_20px_rgba(0,126,239,0.25)]"
          >
            <Play className={`h-4 w-4 text-accent ${isRunningAuto ? "animate-spin" : ""}`} />
            <span>{isRunningAuto ? "Executing Loop..." : task.status === "completed" ? "Completed" : "Run Full Loop"}</span>
          </button>

          <button
            type="button"
            onClick={handleStep}
            disabled={isRunningAuto || task.status === "completed"}
            className="btn-secondary h-11 px-4 text-xs"
          >
            <span>Step Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary h-11 px-3 text-xs"
            title="Reset sandbox"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Real-time Token & Telemetry Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[9px] uppercase font-mono text-muted mb-1">Total Tokens Consumed</div>
          <div className="font-display text-2xl font-bold text-accent-yellow">
            {task.sandbox.metrics.tokensUsed.toLocaleString()} <span className="text-xs font-mono font-normal text-muted">tokens</span>
          </div>
          <div className="text-[10px] font-mono text-muted mt-0.5">
            Prompt: {task.sandbox.metrics.promptTokens} · Output: {task.sandbox.metrics.completionTokens}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[9px] uppercase font-mono text-muted mb-1">Inference Engine</div>
          <div className="font-display text-base font-bold text-white truncate">
            Groq LPU (gpt-oss-120b)
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
            ~300+ tokens/sec
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[9px] uppercase font-mono text-muted mb-1">Harness Tool Calls</div>
          <div className="font-display text-2xl font-bold text-white">
            {task.sandbox.metrics.toolCalls} <span className="text-xs font-mono font-normal text-muted">invocations</span>
          </div>
          <div className="text-[10px] font-mono text-muted mt-0.5">
            Execution: {task.sandbox.metrics.executionTimeMs}ms
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[9px] uppercase font-mono text-muted mb-1">Verification Tests</div>
          <div className="font-display text-2xl font-bold text-emerald-400">
            {task.sandbox.testResults.passed}/{task.sandbox.testResults.total}
          </div>
          <div className="text-[10px] font-mono text-muted mt-0.5">
            Deterministic Vitest harness
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {HARNESS_PRESET_TASKS.map((preset) => {
          const isSelected = selectedPreset === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => handlePresetChange(preset.id)}
              className={`cursor-pointer rounded-xl border p-5 transition-all ${
                isSelected
                  ? "border-accent bg-surface2 shadow-lg"
                  : "border-border bg-surface hover:border-borderStrong"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-display font-semibold text-sm text-white">{preset.title}</span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
              </div>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{preset.prompt}</p>
            </div>
          );
        })}
      </div>

      {/* Main Execution Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Harness Step Loop Log (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-border bg-[#0E1217] px-5 py-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" />
              <span className="font-mono text-xs font-semibold text-white">
                Live Harness Execution Pipeline
              </span>
              <span className="rounded bg-white/5 border border-border px-2 py-0.5 font-mono text-[9px] text-muted">
                Step {task.currentStep} of {task.maxSteps}
              </span>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded ${
              task.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
              task.status === "running" ? "bg-accent/20 text-accent border border-accent/30" :
              "bg-white/5 text-muted border border-border"
            }`}>
              {task.status === "running" && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
              {task.status}
            </span>
          </div>

          {/* Steps list */}
          <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto font-mono text-xs">
            {task.logs.map((log) => (
              <div
                key={log.stepIndex}
                className="rounded-xl border border-border bg-[#0B0E12] p-4 transition-all"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-accent/15 text-accent px-1.5 py-0.5 text-[9px] uppercase font-bold">
                      Step {log.stepIndex}: {log.phase}
                    </span>
                    <span className="text-muted text-[10px]">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    {log.tokensConsumed ? (
                      <span className="text-accent-yellow font-semibold">+{log.tokensConsumed} tokens</span>
                    ) : null}
                    <span>{log.durationMs}ms</span>
                  </div>
                </div>

                {log.thought && (
                  <div className="text-codeFg/90 bg-code p-3 rounded-lg border border-codeBorder mb-2 text-[11px] leading-relaxed">
                    <div className="text-[9px] uppercase text-accent-yellow font-bold mb-1 flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      Live Model Reasoning &amp; Plan
                    </div>
                    {log.thought}
                  </div>
                )}

                {log.toolName && (
                  <div className="bg-[#12161D] p-3 rounded-lg border border-border/80 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-accent font-bold">
                      <span>TOOL: {log.toolName}()</span>
                      <span className="text-emerald-400 font-normal text-[10px]">executed in sandbox</span>
                    </div>
                    {log.toolArgs && (
                      <div className="text-muted text-[10px]">
                        args: {JSON.stringify(log.toolArgs)}
                      </div>
                    )}
                    {log.toolOutput && (
                      <div className="text-codeFg/80 bg-code p-2 rounded text-[10px] mt-1 whitespace-pre-wrap">
                        {log.toolOutput}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Verdict Banner */}
          {task.verdict && (
            <div className="border-t border-border bg-emerald-500/10 p-5 flex items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-emerald-400">
                  {task.verdict.message}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  Score: {task.verdict.score}/100 · {task.sandbox.metrics.tokensUsed} Total Tokens Consumed on Groq LPU
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sandbox Telemetry & Files (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Workspace Tabs Window */}
          <div className="flex-1 rounded-xl border border-border bg-surface overflow-hidden shadow-2xl flex flex-col h-[400px]">
            
            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-border bg-[#0E1217] px-3 py-2">
              <div className="flex items-center gap-1">
                {[
                  { id: "workspace", label: "Workspace", icon: FileCode2 },
                  { id: "diff", label: "AST Diff", icon: GitCompare },
                  { id: "terminal", label: "Terminal", icon: Terminal },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id as any)}
                      className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                        isActive ? "bg-surface2 text-white border border-border" : "text-muted hover:text-white"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-auto p-4 bg-code font-mono text-xs">
              {activeTab === "workspace" && (
                <div>
                  <div className="text-[9px] uppercase text-muted mb-2 border-b border-codeBorder pb-1">
                    File: {selectedFile}
                  </div>
                  <pre className="text-[11px] leading-5 text-codeFg">
                    <code>{task.sandbox.workspace[selectedFile] || "// No file contents"}</code>
                  </pre>
                </div>
              )}

              {activeTab === "diff" && (
                <div>
                  <div className="text-[9px] uppercase text-muted mb-2 border-b border-codeBorder pb-1">
                    Generated Git Diff Patch
                  </div>
                  {task.finalPatch ? (
                    <pre className="text-[10px] leading-4 text-emerald-400 bg-[#080A0D] p-3 rounded">
                      <code>{task.finalPatch}</code>
                    </pre>
                  ) : (
                    <div className="text-muted text-[11px] text-center py-12">
                      Diff will be generated upon sandbox code modification...
                    </div>
                  )}
                </div>
              )}

              {activeTab === "terminal" && (
                <div className="space-y-1 text-[10px] text-codeFg">
                  {task.sandbox.terminalHistory.map((line, idx) => (
                    <div key={idx} className={line.startsWith("$") ? "text-accent font-bold" : "text-muted"}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Plugin Registry Stats Box */}
          <div className="rounded-xl border border-border bg-surface p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <Wrench className="h-4 w-4 text-accent-yellow" />
              <span>Registered Harness Plugins</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {Object.keys(HARNESS_TOOLS).map((tool) => (
                <div key={tool} className="rounded bg-surface2 p-2 border border-border flex items-center justify-between">
                  <span className="text-codeFg">{tool}</span>
                  <span className="text-emerald-400">active</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between text-[10px] text-muted">
              <span>Tool Calls: <strong className="text-white">{task.sandbox.metrics.toolCalls}</strong></span>
              <span>Tokens: <strong className="text-accent-yellow">{task.sandbox.metrics.tokensUsed}</strong></span>
              <span>Tests: <strong className="text-emerald-400">{task.sandbox.testResults.passed}/{task.sandbox.testResults.total}</strong></span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
