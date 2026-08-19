import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/faqs";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";

interface FaqSectionProps {
  onOpenExpertModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenExpertModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative border-b border-border bg-[#090A0C] py-16 md:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="c-tag text-accent-yellow mb-2.5">
                <span className="vector-4x4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-md">
                Have specific questions about isolated microVM runtimes, custom tournament brackets, or VPC on-premise deployments?
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-surface p-6">
              <div className="font-display text-base font-semibold text-white mb-1">
                Have more technical questions?
              </div>
              <p className="text-xs text-muted mb-4">
                Chat directly with our evaluation infrastructure architects.
              </p>
              <button
                type="button"
                onClick={onOpenExpertModal}
                className="btn-secondary w-full"
              >
                <span>Talk to an Expert</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all ${
                    isOpen ? "border-borderStrong bg-surface" : "border-border bg-[#0B0E12] hover:border-borderStrong"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  >
                    <span className="font-display text-base font-medium text-white pr-4">
                      {item.question}
                    </span>
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-surface2 text-muted">
                      {isOpen ? <Minus className="h-3.5 w-3.5 text-accent" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-border/40 font-sans">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
