"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DemonzLogo } from "@/components/canvas/DemonzLogo";
import { experimentsData, ExperimentItem } from "@/data/experiments";
import { TransitionLink } from "@/components/layout/PageTransition";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ExperimentCard({ data }: { data: ExperimentItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const reveal = revealRef.current;
    if (!card || !reveal) return;

    const mm = gsap.matchMedia();

    // Fine-pointer desktop interaction: 3D tilt and circle clip-path expansion
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
      const transX = gsap.quickTo(card, "x", { duration: 0.8, ease: "power3.out" });
      const transY = gsap.quickTo(card, "y", { duration: 0.8, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        xTo(x * 20);
        yTo(-y * 20);
        transX(x * 15);
        transY(y * 15);
      };

      const handleMouseEnter = () => {
        gsap.to(reveal, {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.8,
          ease: "power4.inOut",
        });
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        transX(0);
        transY(0);
        gsap.to(reveal, {
          clipPath: "circle(0% at 50% 50%)",
          duration: 0.8,
          ease: "power4.inOut",
        });
      };

      // Set initial clip-path for fine-pointer desktop
      gsap.set(reveal, { clipPath: "circle(0% at 50% 50%)" });

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Mobile / Touch / Non-desktop: fully reveal single clear text state without ghosting
    mm.add("(max-width: 1023px), (hover: none)", () => {
      gsap.set(reveal, { clipPath: "circle(150% at 50% 50%)" });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="perspective-1000 w-full mb-10 last:mb-0">
      <div
        ref={cardRef}
        className="w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[450px] relative border border-white/10 bg-surface/50 rounded-2xl flex items-center justify-center cursor-pointer transform-style-3d group overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-brand-purple/40"
        data-cursor="project"
      >
        {/* Default State: Displayed only on desktop when not hovered */}
        <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center text-center p-8 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-purple-light font-mono text-xl font-bold">[{data.id}]</span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded bg-black/30 backdrop-blur-sm">
              {data.tag}
            </span>
          </div>
          <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white/60 group-hover:text-white transition-colors">
            {data.title}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span>Hover To Reveal</span>
          </div>
        </div>

        {/* Reveal State: Active on hover (desktop) & permanently clean (mobile/tablet) */}
        <div
          ref={revealRef}
          className="absolute inset-0 z-20 overflow-hidden rounded-2xl bg-[#080808] border border-white/10 group-hover:border-brand-purple/40 transition-colors"
        >
          {/* Visual Backdrop */}
          <div className="absolute inset-0 opacity-40">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(112,0,255,0.3)_0%,rgba(5,5,5,1)_100%)]" />
            )}
          </div>

          {/* Unified Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 z-30">
            <div className="flex justify-between items-start">
              <span className="text-white font-mono text-xl sm:text-2xl font-bold drop-shadow-xl">
                [{data.id}]
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-purple-light border border-brand-purple/40 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40">
                {data.tag}
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2 sm:mb-3">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                  {data.title}
                </h3>
                <span className="text-brand-purple-light transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-light max-w-md drop-shadow-xl leading-relaxed">
                {data.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="uppercase text-brand-purple-light">Launch Creative Code</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperimentsPlayground() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // GSAP Pinning aligned strictly with desktop 2-column layout (min-width: 1024px)
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      if (!containerRef.current || !leftColRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          setInView(self.isActive);
        },
      });

      // Pin the typography on the left while right column scrolls
      ScrollTrigger.create({
        trigger: leftColRef.current,
        start: "top 20%",
        endTrigger: containerRef.current,
        end: "bottom 80%",
        pin: true,
        pinSpacing: false,
      });

      // Subtle bounded parallax that never collides with fixed navbar
      gsap.to(".split-text-target", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black min-h-screen pt-28 sm:pt-32 pb-28 sm:pb-32 overflow-hidden">
      {/* 3D Visual Centerpiece / Artifact on desktop */}
      {isDesktop && (
        <div className="fixed inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
          <DemonzLogo scrollProgress={scrollProgress} active={inView} />
        </div>
      )}

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Left Column: Typography Header */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 h-auto lg:h-[80vh] flex flex-col justify-start lg:pt-12 pointer-events-none"
          >
            <div className="mb-2 sm:mb-4">
              <h1 className="split-text-target text-[clamp(2.25rem,10vw,4.5rem)] lg:text-[5.5vw] xl:text-[6.5vw] font-black tracking-tighter leading-[0.88] text-white uppercase origin-bottom">
                EXPERIMENTS
              </h1>
            </div>
            <div>
              <h1 className="split-text-target text-[clamp(2.25rem,10vw,4.5rem)] lg:text-[5.5vw] xl:text-[6.5vw] font-black tracking-tighter leading-[0.88] text-brand-purple-light uppercase origin-bottom flex items-center gap-3 sm:gap-4">
                <span className="text-white/20 font-light">/</span>
                PLAYGROUND
              </h1>
            </div>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-light text-zinc-400 max-w-sm">
              Experiments where code becomes motion, interaction, and visual systems.
            </p>

            {/* Creative Code Continuity Bridge */}
            <div className="mt-8 pointer-events-auto">
              <TransitionLink
                href="/creative/creative-code"
                className="inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest uppercase text-brand-purple-light hover:text-white transition-colors group"
              >
                <span>Explore Creative Code Reel</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </TransitionLink>
            </div>
          </div>

          {/* Right Column: Clickable Experiment Cards */}
          <div className="lg:col-span-7 mt-8 lg:mt-0 pt-0 lg:pt-[16vh] pb-[8vh]">
            {experimentsData.map((exp) => (
              <TransitionLink
                key={exp.id}
                href={exp.href || "/creative/creative-code"}
                data-cursor="project"
                className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-2xl mb-10 last:mb-0"
              >
                <ExperimentCard data={exp} />
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>

      {/* Continuity Footer */}
      <div className="max-w-[90rem] mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono relative z-10 px-6 md:px-12">
        <span className="text-zinc-500 uppercase tracking-wider">
          04 Computational Experiments Active
        </span>
        <TransitionLink
          href="/creative/creative-code"
          className="text-brand-purple-light hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
        >
          <span>View Creative Code Archive</span>
          <span>→</span>
        </TransitionLink>
      </div>
    </section>
  );
}
