"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/layout/PageTransition";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, getFeaturedProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedProjects();
  const otherProjects = projects.filter((p) => !p.featured);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = sectionRef.current?.querySelectorAll(".project-card-reveal");
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            }
          );
        });
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const cards = sectionRef.current?.querySelectorAll(".project-card-reveal");
      if (cards) {
        cards.forEach((card) => {
          gsap.set(card, { opacity: 1, y: 0 });
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work-archive" ref={sectionRef} className="py-32 md:py-44 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-24 md:mb-32 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              01 // WORK ARCHIVE &amp; FLAGSHIPS
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase">
              ENGINEERED WORKS
            </h1>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light">
            Native mobile platforms, AI applications, web systems, and creative productions built with obsessive craft.
          </p>
        </div>

        {/* Flagship Applications Showcase */}
        <div className="space-y-28 md:space-y-36 mb-36">
          {featured.map((project, index) => {
            const isEven = index % 2 === 1;
            const primaryVisual: string = project.media.cover || project.media.dashboardPreview || "";
            const accent = project.accentColor || "#7000FF";
            const isPortrait = project.media.orientation === "portrait";
            const isSquare = project.media.orientation === "square" || project.media.aspectRatio === "1/1";

            return (
              <div 
                key={project.id}
                className={`project-card-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Content Column */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? "lg:col-start-8" : ""}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-white/40 tracking-wider">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase border"
                      style={{ 
                        color: accent, 
                        borderColor: `${accent}50`,
                        backgroundColor: `${accent}12` 
                      }}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs font-mono text-white/40 uppercase">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-3">
                    {project.title}
                  </h2>
                  <p className="text-base md:text-lg font-medium mb-6 font-mono" style={{ color: accent }}>
                    {project.subtitle}
                  </p>

                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs font-mono text-zinc-300 bg-surface border border-white/10 px-3 py-1.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div>
                    <TransitionLink
                      href={`/work/${project.id}`}
                      className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white bg-surface hover:bg-white/10 border border-white/15 hover:border-white/30 active:scale-95 px-7 py-4 rounded-full transition-all duration-300 group/link shadow-lg"
                      data-cursor="project"
                    >
                      <span>Explore Case Study</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1.5" style={{ color: accent }}>
                        →
                      </span>
                    </TransitionLink>
                  </div>
                </div>

                {/* Media Presentation Column */}
                <div className={`lg:col-span-7 relative w-full ${isEven ? "lg:col-start-1" : ""}`}>
                  <TransitionLink
                    href={`/work/${project.id}`}
                    data-cursor="project"
                    className="block relative w-full rounded-2xl border border-white/10 bg-[#0C0C0E] p-6 sm:p-8 md:p-12 min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center shadow-2xl group transition-all duration-500 hover:border-white/25 cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-10 group-hover:opacity-20"
                      style={{ background: `radial-gradient(circle at center, ${accent} 0%, transparent 70%)` }}
                    />

                    <div className="relative z-10 w-full flex items-center justify-center">
                      {isPortrait ? (
                        <div className={`relative w-full ${
                          project.media.aspectRatio === "4/5"
                            ? "max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[4/5]"
                            : "max-w-[260px] sm:max-w-[300px] md:max-w-[320px] aspect-[9/20]"
                        } rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03]`}>
                          <Image 
                            src={primaryVisual}
                            alt={`${project.title} Dashboard Screenshot`}
                            fill
                            sizes="(max-width: 768px) 260px, 320px"
                            className="object-contain"
                            priority={index === 0}
                          />
                        </div>
                      ) : isSquare ? (
                        <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/5 p-4 sm:p-6 md:p-8 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={primaryVisual}
                              alt={`${project.title} Visual Presentation`}
                              fill
                              sizes="(max-width: 768px) 300px, 380px"
                              className="object-contain drop-shadow-2xl"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`relative w-full ${
                            project.media.aspectRatio === "2/1" ? "max-w-[620px] aspect-[2/1]" : "max-w-[560px] aspect-[3/2]"
                          } rounded-xl overflow-hidden bg-black/40 border border-white/5 p-4 sm:p-6 md:p-8 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image 
                              src={primaryVisual}
                              alt={`${project.title} Visual Presentation`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 620px"
                              className="object-contain drop-shadow-2xl"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                      <span>{project.category}</span>
                    </div>
                  </TransitionLink>
                </div>

              </div>
            );
          })}
        </div>

        {/* Extended Creative & Commercial Initiatives */}
        {otherProjects.length > 0 && (
          <div className="border-t border-white/10 pt-20">
            <div className="mb-16">
              <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-2 block">
                02 // CREATIVE &amp; BUSINESS VENTURES
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase">
                MULTIDISCIPLINARY VENTURES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {otherProjects.map((project) => (
                <TransitionLink
                  key={project.id}
                  href={`/work/${project.id}`}
                  data-cursor="project"
                  className="project-card-reveal group rounded-2xl border border-white/10 bg-surface/30 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 block"
                >
                  <div>
                    {project.media.cover && (
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/5 bg-black">
                        <Image 
                          src={project.media.cover} 
                          alt={project.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw" 
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-white/40 uppercase">{project.year}</span>
                      <span className="text-xs font-mono px-3 py-0.5 rounded-full border border-white/10 text-brand-purple-light">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-bold tracking-tight text-white uppercase group-hover:text-brand-purple-light transition-colors">{project.title}</h3>
                      <span className="text-sm font-mono text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" style={{ color: project.accentColor || "#7000FF" }}>→</span>
                    </div>
                    <p className="text-sm font-mono text-brand-purple-light mb-4">{project.subtitle}</p>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">{project.description}</p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mb-6">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-zinc-400 bg-background/60 px-2.5 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                      <span>Explore Case Study</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: project.accentColor || "#7000FF" }}>→</span>
                    </div>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        )}

        {/* Continuity Action */}
        <div className="mt-32 pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Have a project to build?</h3>
            <p className="text-sm text-zinc-400 font-light">Available for product engineering and creative technology.</p>
          </div>
          <div className="flex items-center gap-4">
            <TransitionLink
              href="/contact"
              className="px-8 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg"
            >
              Start Collaboration →
            </TransitionLink>
            <TransitionLink
              href="/"
              className="text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              Back to Home
            </TransitionLink>
          </div>
        </div>

      </div>
    </section>
  );
}
