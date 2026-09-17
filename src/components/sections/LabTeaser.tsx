"use client";

import { TransitionLink } from "@/components/layout/PageTransition";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { experimentsData } from "@/data/experiments";

const curatedExperiments = experimentsData;

export function LabTeaser() {
  const sectionRef = useScrollReveal<HTMLElement>({ selector: "[data-home-reveal]", stagger: 0.1 });

  return (
    <section ref={sectionRef} id="lab-teaser" className="py-32 md:py-44 px-6 md:px-12 bg-surface/40 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div data-home-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              03 // LAB &amp; EXPERIMENTS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
              CREATIVE CODE
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light">
            Experiments where code becomes motion, interaction and visual systems.
          </p>
        </div>

        {/* Experiments Teaser Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {curatedExperiments.map((exp) => (
            <TransitionLink 
              key={exp.id}
              href="/experiments"
              data-home-reveal
              data-cursor="hover"
              className="p-6 md:p-8 rounded-2xl bg-surface/60 border border-white/10 hover:border-brand-purple/40 transition-all duration-300 flex flex-col justify-between group hover:bg-surface/90 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-brand-purple-light tracking-widest">
                    [{exp.id}]
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded">
                    {exp.tag}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-zinc-100 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span>Launch Fragment</span>
                <span className="text-brand-purple-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </div>
            </TransitionLink>
          ))}
        </div>

        {/* CTA Bar */}
        <div data-home-reveal className="flex justify-center">
          <TransitionLink
            href="/experiments"
            className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white bg-surface hover:bg-brand-purple/20 border border-white/15 hover:border-brand-purple px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>Explore All Experiments ({experimentsData.length})</span>
            <span className="text-brand-purple-light">↗</span>
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}
