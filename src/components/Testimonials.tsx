import React, { useState } from "react";
import { TESTIMONIALS } from "../data/testimonials";
import { Quote, Sparkles, CheckCircle2 } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTestimonial = TESTIMONIALS[activeIdx];

  return (
    <section className="relative border-b border-border bg-[#0B0D10] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="c-tag text-accent-yellow mb-2.5 mx-auto">
            <span className="vector-4x4" />
            <span>Developer Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Trusted by Teams Shipping Frontier Agents
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold tracking-widest text-accent">
                  {activeTestimonial.logoText}
                </span>
                <span className="h-3 w-px bg-border" />
                <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {activeTestimonial.verifiedMetric}
                </span>
              </div>
              <Quote className="h-8 w-8 text-borderStrong" />
            </div>

            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-white leading-snug mb-8">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <img
                src={activeTestimonial.avatarUrl}
                alt={activeTestimonial.author}
                className="h-12 w-12 rounded-full border border-borderStrong object-cover"
              />
              <div>
                <div className="font-semibold text-white text-base">
                  {activeTestimonial.author}
                </div>
                <div className="font-mono text-xs text-muted">
                  {activeTestimonial.role} @ {activeTestimonial.company}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Tabs Switcher */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-accent bg-surface2/90 shadow-lg"
                    : "border-border bg-surface hover:border-borderStrong hover:bg-surface2/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.author}
                    className="h-9 w-9 rounded-full border border-border object-cover"
                  />
                  <div>
                    <div className="font-semibold text-xs text-white">{t.author}</div>
                    <div className="font-mono text-[10px] text-muted">{t.company}</div>
                  </div>
                </div>
                {isActive && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
