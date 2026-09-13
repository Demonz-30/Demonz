"use client";

import { TransitionLink } from "@/components/layout/PageTransition";

const curatedExperiments = [
  {
    id: "01",
    title: "DIGITAL IDENTITY",
    tag: "Interactive Branding",
    description: "Visual identity exploration combining procedural shader distortions and real-time cursor reaction.",
  },
  {
    id: "02",
    title: "CREATIVE CODE",
    tag: "Generative Systems",
    description: "Algorithmic visual systems and mathematical noise fields responding dynamically to input events.",
  },
  {
    id: "03",
    title: "WEB EXPERIENCE",
    tag: "Interface Fragments",
    description: "Experimental UI components, spring micro-interactions, and kinetic typography choreography.",
  }
];

export function LabTeaser() {
  return (
    <section id="lab-teaser" className="py-32 md:py-44 px-6 md:px-12 bg-surface/40 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              03 // LAB &amp; EXPERIMENTS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
              TECHNICAL FRAGMENTS
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light">
            A sandboxed space exploring creative code, generative graphics, and interactive web fragments.
          </p>
        </div>

        {/* Experiments Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {curatedExperiments.map((exp) => (
            <TransitionLink 
              key={exp.id}
              href="/experiments"
              data-cursor="hover"
              className="p-8 rounded-2xl bg-surface/60 border border-white/10 hover:border-brand-purple/40 transition-all duration-300 flex flex-col justify-between group hover:bg-surface/90 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-brand-purple-light tracking-widest">
                    [{exp.id}]
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
                    {exp.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-zinc-100 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span>Launch Fragment in Lab</span>
                <span className="text-brand-purple-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </div>
            </TransitionLink>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex justify-center">
          <TransitionLink
            href="/experiments"
            className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white bg-surface hover:bg-brand-purple/20 border border-white/15 hover:border-brand-purple px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>Explore All Experiments (6)</span>
            <span className="text-brand-purple-light">↗</span>
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}
