"use client";

import { testimonials } from "@/data/testimonials";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function WhatTheySay() {
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });

  return (
    <section
      ref={sectionRef}
      id="what-they-say"
      className="py-24 md:py-36 px-6 md:px-12 bg-black relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <span
            data-reveal
            className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-3 block"
          >
            02 // EVIDENCE &amp; COLLABORATION
          </span>
          <h2
            data-reveal
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase"
          >
            WHAT THEY SAY
          </h2>
          <p
            data-reveal
            className="text-sm md:text-base text-zinc-400 font-light mt-3 max-w-xl"
          >
            Reflections and context from teams, venture partners, and product collaborators I&apos;ve built with.
          </p>
        </div>

        {/* Editorial Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              className="bg-surface/30 border border-white/10 rounded-2xl p-7 md:p-8 flex flex-col justify-between hover:border-brand-purple/40 transition-colors duration-300"
            >
              <div>
                <div className="text-2xl font-serif text-brand-purple-light/50 mb-3 select-none" aria-hidden="true">
                  &ldquo;
                </div>
                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-8">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {item.author}
                  </span>
                  <span className="text-[10px] font-mono text-brand-purple-light/70 uppercase tracking-widest border border-brand-purple/20 px-2 py-0.5 rounded-full">
                    0{index + 1}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1 block">
                  {item.role} &mdash; {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

