"use client";

import Image from "next/image";
import { creativeWorks, CreativeWork } from "@/data/creative";
import { TransitionLink } from "@/components/layout/PageTransition";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Photography() {
  const containerRef = useScrollReveal<HTMLElement>({
    selector: "[data-creative-reveal]",
    stagger: 0.06,
    y: 28,
  });

  return (
    <section
      ref={containerRef}
      className="bg-background relative min-h-screen pt-32 md:pt-44 pb-32 px-6 md:px-12 text-foreground"
    >
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto mb-28 md:mb-40 border-b border-white/10 pb-12">
        <div data-creative-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              03 // VISUAL ARCHIVE
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase">
              CREATIVE WORKS
            </h1>
          </div>
          <div className="max-w-md space-y-3">
            <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              An editorial archive of commercial craft, documentary photography, and visual storytelling experiments.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase">
              <span>07 Selected Works</span>
              <span>•</span>
              <span>Vertical Archive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Editorial Gallery */}
      <div className="max-w-6xl mx-auto space-y-32 md:space-y-48">
        {creativeWorks.map((work, index) => (
          <EditorialWorkCard key={work.id} work={work} index={index} />
        ))}
      </div>

      {/* Archive Footer Continuity */}
      <div className="max-w-6xl mx-auto mt-40 pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
        <span className="text-zinc-500 uppercase tracking-wider">
          End of Creative Archive // 07 Works
        </span>
        <TransitionLink
          href="/work"
          className="text-brand-purple-light hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
        >
          <span>Explore Application Engineering</span>
          <span>→</span>
        </TransitionLink>
      </div>
    </section>
  );
}

function EditorialWorkCard({ work, index }: { work: CreativeWork; index: number }) {
  const isPortrait = work.orientation === "portrait";

  // Layout 1: Wide Landscape Presentation (Works 03, 06, 07)
  if (!isPortrait) {
    return (
      <article data-creative-reveal className="w-full max-w-5xl mx-auto">
        <TransitionLink
          href={`/creative/${work.slug}`}
          data-cursor="project"
          className="group block"
        >
          {/* Top Metadata Bar */}
          <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-white/50">
            <div className="flex items-center gap-3">
              <span className="text-brand-purple-light font-bold">[{work.number}]</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] text-zinc-300 uppercase">
                {work.category}
              </span>
            </div>
            <span>{work.year}</span>
          </div>

          {/* Large Landscape Image */}
          <div className={`relative w-full ${work.aspectRatio} rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 bg-black/60 shadow-2xl transition-all duration-500`}>
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Bottom Editorial Caption */}
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-purple-light transition-colors mb-2">
                {work.title}
              </h2>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {work.shortIntro}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline uppercase">
                {work.role}
              </span>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-brand-purple-light transition-colors">
                <span>Explore Work</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-brand-purple-light">
                  →
                </span>
              </div>
            </div>
          </div>
        </TransitionLink>
      </article>
    );
  }

  // Layout 2: Centered Studio Portrait (Work 04)
  if (index === 3) {
    return (
      <article data-creative-reveal className="w-full max-w-xl mx-auto">
        <TransitionLink
          href={`/creative/${work.slug}`}
          data-cursor="project"
          className="group block flex flex-col items-center"
        >
          {/* Top Metadata */}
          <div className="w-full max-w-[440px] flex items-center justify-between gap-4 mb-4 text-xs font-mono text-white/50">
            <div className="flex items-center gap-3">
              <span className="text-brand-purple-light font-bold">[{work.number}]</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] text-zinc-300 uppercase">
                {work.category}
              </span>
            </div>
            <span>{work.year}</span>
          </div>

          {/* Centered Image */}
          <div className={`relative w-full max-w-[440px] ${work.aspectRatio} rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 bg-black/60 shadow-2xl transition-all duration-500`}>
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Centered Caption */}
          <div className="w-full max-w-[440px] mt-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-brand-purple-light transition-colors mb-2">
              {work.title}
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
              {work.shortIntro}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-brand-purple-light transition-colors">
              <span>Explore Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-brand-purple-light">
                →
              </span>
            </div>
          </div>
        </TransitionLink>
      </article>
    );
  }

  // Layout 3: Asymmetric Left Portrait (Works 01, 05)
  if (index === 0 || index === 4) {
    return (
      <article data-creative-reveal className="w-full max-w-5xl mx-auto">
        <TransitionLink
          href={`/creative/${work.slug}`}
          data-cursor="project"
          className="group block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* Portrait Image Column */}
          <div className="lg:col-span-6 w-full max-w-[480px]">
            <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-white/50">
              <div className="flex items-center gap-3">
                <span className="text-brand-purple-light font-bold">[{work.number}]</span>
                <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] text-zinc-300 uppercase">
                  {work.category}
                </span>
              </div>
              <span>{work.year}</span>
            </div>

            <div className={`relative w-full ${work.aspectRatio} rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 bg-black/60 shadow-2xl transition-all duration-500`}>
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Narrative Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono text-brand-purple-light uppercase tracking-widest mb-3 block">
              {work.role}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-purple-light transition-colors mb-4">
              {work.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-8">
              {work.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {work.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] font-mono text-zinc-400 bg-surface/60 border border-white/5 px-3 py-1 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-brand-purple-light transition-colors">
                <span>Explore Work</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-brand-purple-light">
                  →
                </span>
              </div>
            </div>
          </div>
        </TransitionLink>
      </article>
    );
  }

  // Layout 4: Asymmetric Right Portrait (Work 02)
  return (
    <article data-creative-reveal className="w-full max-w-5xl mx-auto">
      <TransitionLink
        href={`/creative/${work.slug}`}
        data-cursor="project"
        className="group block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
      >
        {/* Narrative Content Column */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
          <span className="text-xs font-mono text-brand-purple-light uppercase tracking-widest mb-3 block">
            {work.role}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-purple-light transition-colors mb-4">
            {work.title}
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-8">
            {work.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {work.tools.map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-mono text-zinc-400 bg-surface/60 border border-white/5 px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-brand-purple-light transition-colors">
              <span>Explore Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-brand-purple-light">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Portrait Image Column */}
        <div className="lg:col-span-6 order-1 lg:order-2 w-full max-w-[480px] lg:ml-auto">
          <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-white/50">
            <div className="flex items-center gap-3">
              <span className="text-brand-purple-light font-bold">[{work.number}]</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[11px] text-zinc-300 uppercase">
                {work.category}
              </span>
            </div>
            <span>{work.year}</span>
          </div>

          <div className={`relative w-full ${work.aspectRatio} rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 bg-black/60 shadow-2xl transition-all duration-500`}>
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
