"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DemonzLogo } from "@/components/canvas/DemonzLogo";

gsap.registerPlugin(ScrollTrigger);

const experimentsData = [
  {
    id: "01",
    title: "DIGITAL IDENTITY",
    desc: "Interactive branding and visual identity exploration.",
    image: "/assets/brand/demonz-logo.jpg",
  },
  {
    id: "02",
    title: "CREATIVE CODE",
    desc: "Generative visual systems responding to user input.",
    image: null, // We'll use a CSS gradient/shader placeholder
  },
  {
    id: "03",
    title: "PHOTOGRAPHY",
    desc: "Editorial composition and visual storytelling.",
    image: "/assets/photography/photo-1.jpg",
  },
  {
    id: "04",
    title: "MOTION",
    desc: "Kinetic motion design and video editing.",
    image: "/assets/projects/creative-multimedia.jpg",
  },
  {
    id: "05",
    title: "WEB EXPERIENCE",
    desc: "Miniature interactive UI and frontend experiments.",
    image: "/assets/projects/gizvana-1.jpg",
  },
  {
    id: "06",
    title: "AI / FUTURE",
    desc: "Exploring AI-assisted workflows and interfaces.",
    image: "/assets/projects/hyperassist-1.jpg",
  }
];

function ExperimentCard({ data }: { data: typeof experimentsData[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    const reveal = revealRef.current;
    if (!card || !reveal) return;

    // We only enable 3D rotation on devices with hover to save performance/avoid touch glitches
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
      const transX = gsap.quickTo(card, "x", { duration: 0.8, ease: "power3.out" });
      const transY = gsap.quickTo(card, "y", { duration: 0.8, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        // Normalized coordinates -1 to 1
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Rotation intensity
        xTo(x * 20); // max 10 deg
        yTo(-y * 20);
        
        // Subtle magnetic pull
        transX(x * 15);
        transY(y * 15);
      };

      const handleMouseEnter = () => {
        gsap.to(reveal, { clipPath: "circle(150% at 50% 50%)", duration: 0.8, ease: "power4.inOut" });
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        transX(0);
        transY(0);
        gsap.to(reveal, { clipPath: "circle(0% at 50% 50%)", duration: 0.8, ease: "power4.inOut" });
      };

      // Set initial clip-path
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
    
    // Touch/Mobile fallback
    mm.add("(max-width: 768px)", () => {
       gsap.set(reveal, { clipPath: "circle(150% at 50% 50%)", opacity: 0.15 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="perspective-1000 w-full mb-12 last:mb-0">
      <div 
        ref={cardRef} 
        className="w-full h-[300px] md:h-[450px] relative border border-white/10 bg-surface/50 rounded-2xl flex items-center justify-center cursor-pointer transform-style-3d group"
        data-cursor="project"
      >
        {/* Default State */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 transition-opacity duration-500 group-hover:opacity-0 md:group-hover:opacity-0 opacity-100">
          <span className="text-brand-purple font-mono text-xl mb-4">[{data.id}]</span>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/50">{data.title}</h3>
        </div>

        {/* Reveal State */}
        <div ref={revealRef} className="absolute inset-0 z-20 overflow-hidden rounded-2xl bg-black border border-brand-purple/30">
          <div className="absolute inset-0 opacity-40">
            {data.image ? (
              <Image src={data.image} alt={data.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(112,0,255,0.4)_0%,rgba(0,0,0,1)_100%)]"></div>
            )}
          </div>
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-30 translate-z-10">
            <div className="flex justify-between items-start">
              <span className="text-white font-mono text-2xl drop-shadow-xl">{data.id}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple border border-brand-purple px-4 py-2 rounded-full backdrop-blur-md bg-black/30">Explore ↗</span>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-2xl">{data.title}</h3>
              <p className="text-lg md:text-xl text-white/80 font-light max-w-md drop-shadow-xl">{data.desc}</p>
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
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      if (!containerRef.current || !leftColRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          setInView(self.isActive);
        }
      });

      // Pin the typography on the left while right scrolls
      ScrollTrigger.create({
        trigger: leftColRef.current,
        start: "top 20%",
        endTrigger: containerRef.current,
        end: "bottom 80%",
        pin: true,
        pinSpacing: false,
      });

      // Parallax text
      gsap.to(".split-text-target", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black min-h-screen pt-32 pb-32">
      {/* 3D Visual Centerpiece / Artifact */}
      {!isMobile && (
        <div className="fixed inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
          <DemonzLogo scrollProgress={scrollProgress} active={inView} />
        </div>
      )}

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Fixed Typography */}
          <div ref={leftColRef} className="lg:col-span-5 h-auto lg:h-[80vh] flex flex-col justify-start lg:pt-12 pointer-events-none">
            <div className="overflow-hidden mb-4">
              <h1 className="split-text-target text-[15vw] lg:text-[7vw] font-black tracking-tighter leading-[0.85] text-white uppercase origin-bottom">
                EXPERIMENT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="split-text-target text-[15vw] lg:text-[7vw] font-black tracking-tighter leading-[0.85] text-brand-purple uppercase origin-bottom flex items-center gap-4">
                <span className="text-white/20 font-light">/</span>
                PLAYGROUND
              </h1>
            </div>
            <p className="mt-8 text-xl font-light text-white/50 max-w-sm mix-blend-difference">
              A collection of digital interactions, visual concepts, and technical fragments designed by DEMONZ.
            </p>
          </div>

          {/* Right Column: Scrollable Cards */}
          <div className="lg:col-span-7 mt-12 lg:mt-0 pt-0 lg:pt-[20vh] pb-[10vh]">
            {experimentsData.map((exp) => (
              <ExperimentCard key={exp.id} data={exp} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
