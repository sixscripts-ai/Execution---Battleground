import React, { useState } from "react";
import { 
  CustomBenchmark, 
  getCustomBenchmarks, 
  saveCustomBenchmark, 
  deleteCustomBenchmark 
} from "../services/customBenchmarkService";
import { runCodeInSandbox, ExecutionResult } from "../services/sandboxRunner";
import { 
  Plus, 
  Save, 
  Play, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Swords, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface CustomBenchmarkPageProps {
  onLaunchBenchmark: (benchmark: CustomBenchmark) => void;
  onNavigate: (page: string) => void;
}

export const CustomBenchmarkPage: React.FC<CustomBenchmarkPageProps> = ({ onLaunchBenchmark, onNavigate }) => {
  const [benchmarks, setBenchmarks] = useState<CustomBenchmark[]>(() => getCustomBenchmarks());
  const [selectedBenchmark, setSelectedBenchmark] = useState<CustomBenchmark>(benchmarks[0] || {
    id: `custom-${Date.now()}`,
    title: "New Custom Challenge",
    category: "Algorithm",
    difficulty: "Medium",
    description: "Describe the bug or feature challenge for AI agents to solve.",
    initialCode: "// Starting code snippet with bug\nfunction calculateDiscount(price, coupon) {\n  if (coupon === 'SAVE20') return price * 0.8;\n  return price;\n}",
    testAssertions: "expect(calculateDiscount(100, 'SAVE20')).toBe(80);\nexpect(calculateDiscount(100, 'INVALID')).toBe(100);",
    timeoutSeconds: 180,
    createdAt: Date.now(),
    author: "User"
  });

  const [testResult, setTestResult] = useState<ExecutionResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestInSandbox = async () => {
    setIsTesting(true);
    const res = await runCodeInSandbox(selectedBenchmark.initialCode, selectedBenchmark.testAssertions);
    setTestResult(res);
    setIsTesting(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomBenchmark(selectedBenchmark);
    setBenchmarks(getCustomBenchmarks());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleDelete = (id: string) => {
    deleteCustomBenchmark(id);
    const remaining = getCustomBenchmarks();
    setBenchmarks(remaining);
    if (remaining.length > 0) setSelectedBenchmark(remaining[0]);
  };

  const handleCreateNew = () => {
    const fresh: CustomBenchmark = {
      id: `custom-${Date.now()}`,
      title: "Custom Challenge Scenario",
      category: "Software Engineering",
      difficulty: "Medium",
      description: "Explain the bug or feature specification...",
      initialCode: "// Write buggy starting code\nfunction processPayment(amount) {\n  return { status: 'success', amount };\n}",
      testAssertions: "expect(processPayment(50).status).toBe('success');",
      timeoutSeconds: 180,
      createdAt: Date.now(),
      author: "User"
    };
    setSelectedBenchmark(fresh);
    setTestResult(null);
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6">
      
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="c-tag text-accent-cyan mb-2.5">
            <span className="vector-4x4" />
            <span>Benchmark Authoring Studio</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Custom Benchmark &amp; Bug Builder
          </h1>
          <p className="mt-2 text-sm text-muted max-w-2xl">
            Author your own custom bug scenarios, write unit test assertions, and pit AI models in live head-to-head battles against your challenges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCreateNew}
            className="btn-secondary h-11 px-4 text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>New Challenge</span>
          </button>

          <button
            type="button"
            onClick={() => onLaunchBenchmark(selectedBenchmark)}
            className="btn-primary h-11 px-5 text-xs shadow-[0_0_20px_rgba(0,126,239,0.25)]"
          >
            <Swords className="h-4 w-4 text-accent" />
            <span>Battle Models on This</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Saved Benchmarks (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted uppercase tracking-wider px-1">
            <span>Saved Benchmarks ({benchmarks.length})</span>
          </div>

          <div className="space-y-3">
            {benchmarks.map((b) => {
              const isSelected = selectedBenchmark.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBenchmark(b);
                    setTestResult(null);
                  }}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-accent bg-surface2 shadow-lg"
                      : "border-border bg-surface hover:border-borderStrong"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-display font-semibold text-sm text-white">{b.title}</div>
                    <span className="rounded bg-white/5 border border-border px-1.5 py-0.2 font-mono text-[9px] text-muted">
                      {b.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-muted line-clamp-2 mb-3">
                    {b.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px]">
                    <span className="text-accent">{b.category}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(b.id);
                      }}
                      className="text-muted hover:text-red-400 p-1"
                      title="Delete benchmark"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Editor Form (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <form onSubmit={handleSave} className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-6">
            
            {/* Title & Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-mono text-[10px] uppercase text-muted mb-1.5 font-semibold">
                  Challenge Title
                </label>
                <input
                  type="text"
                  required
                  value={selectedBenchmark.title}
                  onChange={(e) => setSelectedBenchmark({ ...selectedBenchmark, title: e.target.value })}
                  className="w-full h-10 rounded-lg border border-border bg-[#0B0E12] px-3 font-mono text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-muted mb-1.5 font-semibold">
                  Difficulty
                </label>
                <select
                  value={selectedBenchmark.difficulty}
                  onChange={(e) => setSelectedBenchmark({ ...selectedBenchmark, difficulty: e.target.value as any })}
                  className="w-full h-10 rounded-lg border border-border bg-[#0B0E12] px-3 font-mono text-xs text-white focus:border-accent focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-muted mb-1.5 font-semibold">
                Challenge Prompt / Bug Description
              </label>
              <textarea
                rows={3}
                required
                value={selectedBenchmark.description}
                onChange={(e) => setSelectedBenchmark({ ...selectedBenchmark, description: e.target.value })}
                className="w-full rounded-lg border border-border bg-[#0B0E12] p-3 font-sans text-xs text-white focus:border-accent focus:outline-none"
              />
            </div>

            {/* Initial Code */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-[10px] uppercase text-muted font-semibold">
                  Initial Buggy Code File
                </label>
                <span className="font-mono text-[9px] text-muted">TypeScript / JavaScript</span>
              </div>
              <textarea
                rows={7}
                required
                value={selectedBenchmark.initialCode}
                onChange={(e) => setSelectedBenchmark({ ...selectedBenchmark, initialCode: e.target.value })}
                className="w-full rounded-lg border border-border bg-code p-3 font-mono text-xs text-codeFg leading-5 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Test Assertions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-[10px] uppercase text-muted font-semibold">
                  Validation Test Assertions (Win Condition)
                </label>
                <span className="font-mono text-[9px] text-emerald-400">expect(actual).toBe(expected)</span>
              </div>
              <textarea
                rows={5}
                required
                value={selectedBenchmark.testAssertions}
                onChange={(e) => setSelectedBenchmark({ ...selectedBenchmark, testAssertions: e.target.value })}
                className="w-full rounded-lg border border-border bg-code p-3 font-mono text-xs text-emerald-300 leading-5 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Test in Sandbox Output */}
            {testResult && (
              <div className={`rounded-lg border p-4 font-mono text-xs ${
                testResult.success ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-red-500/40 bg-red-500/10 text-red-300"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold flex items-center gap-1.5">
                    {testResult.success ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-red-400" />}
                    {testResult.success ? "Sandbox Verification Passed" : "Sandbox Test Failed"}
                  </span>
                  <span>{testResult.passedTests}/{testResult.totalTests} tests · {testResult.durationMs}ms</span>
                </div>
                <div className="space-y-1 text-[11px] opacity-90">
                  {testResult.logs.map((l, idx) => (
                    <div key={idx}>{l}</div>
                  ))}
                  {testResult.error && (
                    <div className="text-red-400 font-semibold mt-1">[Error]: {testResult.error}</div>
                  )}
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleTestInSandbox}
                disabled={isTesting}
                className="btn-secondary h-10 px-4 text-xs"
              >
                <Play className="h-3.5 w-3.5 text-accent-yellow" />
                <span>{isTesting ? "Evaluating Sandbox..." : "Test in Browser Sandbox"}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-primary h-10 px-5 text-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{saveSuccess ? "Saved Successfully!" : "Save Benchmark"}</span>
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
