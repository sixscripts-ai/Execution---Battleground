import React, { useState } from "react";
import { X, Key, ShieldCheck, Cpu, Zap, Check, Sparkles, HardDrive } from "lucide-react";
import { ApiKeysConfig, loadApiKeys, saveApiKeys } from "../services/llmService";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (config: ApiKeysConfig) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [config, setConfig] = useState<ApiKeysConfig>(() => loadApiKeys());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKeys(config);
    setSavedSuccess(true);
    if (onSaved) onSaved(config);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderStrong bg-[#0E1217] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-muted hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="c-tag text-accent-yellow mb-2">
            <Key className="h-3 w-3" />
            <span>BYOK &amp; Multi-Model Provider Settings</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Model Execution Engine Configuration
          </h3>
          <p className="text-xs text-muted mt-1">
            Choose between deterministic sandbox simulation mode (free &amp; instant) or live multi-provider LLM API inference.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5 font-mono text-xs">
          
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setConfig({ ...config, mode: "simulated" })}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                config.mode === "simulated"
                  ? "border-accent bg-surface2 shadow-[0_0_15px_rgba(0,126,239,0.2)]"
                  : "border-border bg-surface hover:border-borderStrong"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-4 w-4 text-accent" />
                <span className="font-bold text-white text-xs">Simulated Engine</span>
              </div>
              <p className="text-[10px] text-muted leading-relaxed">
                Deterministic sandbox traces. Instant execution with 0 API cost.
              </p>
            </div>

            <div
              onClick={() => setConfig({ ...config, mode: "live" })}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                config.mode === "live"
                  ? "border-accent-pink bg-surface2 shadow-[0_0_15px_rgba(245,141,227,0.2)]"
                  : "border-border bg-surface hover:border-borderStrong"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-accent-pink" />
                <span className="font-bold text-white text-xs">Live API Mode (BYOK)</span>
              </div>
              <p className="text-[10px] text-muted leading-relaxed">
                Prompts live models in real-time (DeepSeek, Groq, Gemini, OpenAI, Claude, Ollama).
              </p>
            </div>
          </div>

          {/* If Live mode enabled, show key inputs */}
          {config.mode === "live" && (
            <div className="rounded-xl border border-border bg-surface p-4 space-y-3 animate-in fade-in duration-150">
              
              <div>
                <label className="block text-accent text-[10px] uppercase mb-1 font-bold flex items-center justify-between">
                  <span>DeepSeek Official API Key (platform.deepseek.com)</span>
                  <span className="text-[9px] text-accent font-normal">Pre-loaded Key</span>
                </label>
                <input
                  type="password"
                  value={config.deepseekKey || ""}
                  onChange={(e) => setConfig({ ...config, deepseekKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full h-9 rounded-lg border border-accent/30 bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-accent-yellow text-[10px] uppercase mb-1 font-bold">
                  Groq API Key (Pre-loaded Ultra-Fast LPU)
                </label>
                <input
                  type="password"
                  value={config.groqKey || ""}
                  onChange={(e) => setConfig({ ...config, groqKey: e.target.value })}
                  placeholder="gsk_..."
                  className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-purple-400 text-[10px] uppercase mb-1 font-bold flex items-center justify-between">
                  <span>AgentRouter API Key (agentrouter.org)</span>
                  <span className="text-[9px] text-purple-300 font-normal">Pre-loaded Gateway Key</span>
                </label>
                <input
                  type="password"
                  value={config.agentRouterKey || ""}
                  onChange={(e) => setConfig({ ...config, agentRouterKey: e.target.value })}
                  placeholder="sk-..."
                  className="w-full h-9 rounded-lg border border-purple-500/30 bg-[#0B0E12] px-3 text-white focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted text-[10px] uppercase mb-1">
                  Google Gemini / AI Studio API Key
                </label>
                <input
                  type="password"
                  value={config.geminiKey || ""}
                  onChange={(e) => setConfig({ ...config, geminiKey: e.target.value })}
                  placeholder="AIzaSy... or AQ.Ab8..."
                  className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-muted text-[10px] uppercase mb-1">
                  OpenRouter API Key (Universal Hub for R1, Llama, Qwen)
                </label>
                <input
                  type="password"
                  value={config.openRouterKey || ""}
                  onChange={(e) => setConfig({ ...config, openRouterKey: e.target.value })}
                  placeholder="sk-or-v1-..."
                  className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted text-[10px] uppercase mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={config.openaiKey || ""}
                  onChange={(e) => setConfig({ ...config, openaiKey: e.target.value })}
                  placeholder="sk-proj-..."
                  className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-muted text-[10px] uppercase mb-1">
                  Local Ollama Endpoint (Offline Models)
                </label>
                <input
                  type="text"
                  value={config.localEndpoint || "http://localhost:11434"}
                  onChange={(e) => setConfig({ ...config, localEndpoint: e.target.value })}
                  placeholder="http://localhost:11434"
                  className="w-full h-9 rounded-lg border border-border bg-[#0B0E12] px-3 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>API keys are stored strictly in your browser&apos;s localStorage and never leave your machine.</span>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary h-10 px-5 text-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Configuration Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
