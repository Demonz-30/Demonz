"use client";

import { primaryCapabilities } from "@/data/capabilities";

const capabilities = primaryCapabilities;

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32 md:py-44 px-6 md:px-12 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              02 // CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
              HOW I BUILD
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light">
            Core engineering pillars focused on building reliable, modern, and scalable software systems.
          </p>
        </div>

        {/* Architectural Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-white/10 divide-y divide-white/10 lg:divide-y-0">
          {capabilities.map((group, index) => {
            const isRightCol = index % 2 === 1;
            const isBottomRow = index >= 2;

            return (
              <div 
                key={group.id}
                className={`py-12 md:py-16 ${
                  isRightCol ? "lg:pl-16 lg:border-l lg:border-white/10" : "lg:pr-16"
                } ${
                  isBottomRow ? "lg:border-t lg:border-white/10" : ""
                } flex flex-col justify-between group transition-colors duration-300 hover:bg-white/[0.015]`}
              >
                <div>
                  {/* Top Metadata Row: Index + Domain */}
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-3xl md:text-4xl font-light text-zinc-600 group-hover:text-brand-purple-light transition-colors duration-300">
                      {group.id}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                      {group.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-zinc-100 transition-colors">
                    {group.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-10 max-w-lg">
                    {group.description}
                  </p>
                </div>

                {/* Technical Specifications */}
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1 h-1 rounded-full bg-brand-purple" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Core Stack &amp; Protocols
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs font-mono text-zinc-300 bg-surface/60 border border-white/10 px-2.5 py-1 rounded transition-colors group-hover:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
