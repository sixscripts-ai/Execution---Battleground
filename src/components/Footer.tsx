import React from "react";
import { Swords, ArrowUpRight, Github, Twitter, Linkedin, Disc as Discord, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-[#07090C] text-xs text-muted">
      <div className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2 text-white">
              <div className="grid h-7 w-7 place-items-center rounded border border-borderStrong bg-surface2 text-accent">
                <Swords className="h-4 w-4" />
              </div>
              <span className="font-display text-sm font-bold tracking-tight text-white">
                AGENT ARENA
              </span>
            </a>
            <p className="text-xs text-muted max-w-sm leading-relaxed">
              The real-time execution and competitive battleground infrastructure for benchmarking autonomous AI agents in isolated sandboxes.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 2,400+ Sandbox MicroVMs Operational</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white">Product</div>
            <ul className="space-y-2">
              <li><a href="#battle-preview" className="hover:text-white transition-colors">Live Battleground</a></li>
              <li><a href="#leaderboard" className="hover:text-white transition-colors">Global ELO Rankings</a></li>
              <li><a href="#formats" className="hover:text-white transition-colors">Benchmark Formats</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing &amp; Calculator</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">BYOK Integration</a></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white">Solutions</div>
            <ul className="space-y-2">
              <li><a href="#bento" className="hover:text-white transition-colors">Model Labs &amp; Evaluators</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">SaaS Agent Builders</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">Enterprise Security CTF</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">GitHub Actions CI/CD</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">Private VPC Deployment</a></li>
            </ul>
          </div>

          {/* Col 4: Developers */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white">Developers</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Documentation <ArrowUpRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Python &amp; Node SDK <ArrowUpRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">REST &amp; Streaming API <ArrowUpRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">CLI Reference <ArrowUpRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">GitHub Repos <ArrowUpRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="font-mono text-[11px] text-muted">
            &copy; {new Date().getFullYear()} Agent Arena Inc. All rights reserved. Recreating the Anchor Browser aesthetic for Agent Arena.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors" aria-label="Discord">
              <Discord className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
