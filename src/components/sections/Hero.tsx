"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { content } from "@/data/content";
import { DemonzLogo } from "@/components/canvas/DemonzLogo";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(true);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, { duration: 1.2 });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // UI Elements entry
      gsap.fromTo(".hero-ui-element", {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out"
      });

      // Scroll Choreography
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
            // Fade out UI content as we push through
            if (contentRef.current) {
              contentRef.current.style.opacity = Math.max(0, 1 - self.progress * 2).toString();
              contentRef.current.style.transform = `translateY(${self.progress * -100}px)`;
            }
            // Disable canvas when scrolled out of view
            const isVisible = self.progress < 0.99;
            setInView((prev) => (prev !== isVisible ? isVisible : prev));
          }
        });
      }
    });
    
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-ui-element", { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-black">
      {/* WebGL Canvas Background / Artifact (Desktop) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-auto">
          <DemonzLogo scrollProgress={scrollProgress} active={inView} />
        </div>
      )}

      {/* Static Fallback (Mobile) */}
      {isMobile && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none overflow-hidden">
           <div className="relative w-[300px] h-[300px] blur-sm">
              <Image src="/assets/brand/demonz-logo.jpg" alt="DEMONZ Logo" fill sizes="300px" className="object-contain animate-pulse" priority />
           </div>
        </div>
      )}

      {/* Typography Overlay */}
      <div ref={contentRef} className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none mt-[14vh] md:mt-[16vh] flex flex-col items-center md:items-start text-center md:text-left">
        <div className="overflow-hidden mb-3">
          <span className="hero-ui-element inline-block text-xs font-mono tracking-widest text-brand-purple-light uppercase border border-brand-purple/40 px-3.5 py-1 rounded-full bg-surface/80 backdrop-blur-md">
            Creative Technologist &amp; Product Engineer
          </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-ui-element text-[14vw] md:text-[9.5vw] font-black leading-none tracking-tighter text-white uppercase mb-2">
            DEMONZDEV
          </h1>
        </div>
        <div className="overflow-hidden">
          <h2 className="hero-ui-element text-lg md:text-2xl text-zinc-300 font-medium tracking-wide uppercase">
            Product Engineer &amp; Builder
          </h2>
        </div>
        <div className="overflow-hidden max-w-xl">
          <p className="hero-ui-element text-sm md:text-base text-zinc-400 font-light leading-relaxed mt-4 mb-8">
            Building digital products, mobile platforms, and interactive systems where engineering depth meets creative execution.
          </p>
        </div>
        <div className="hero-ui-element flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <a
            href="#selected-work"
            onClick={(e) => handleScrollTo(e, "#selected-work")}
            className="px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-brand-purple/25 flex items-center gap-2"
          >
            <span>View Selected Work</span>
            <span>↓</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Kinetic Disciplines Ticker */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden pointer-events-none z-10 opacity-25">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...content.footer.categories, ...content.footer.categories, ...content.footer.categories].map((discipline, i) => (
            <span key={i} className="text-2xl md:text-4xl font-black uppercase tracking-tighter mx-8 text-white/30" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              {discipline}
            </span>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
      `}} />
    </section>
  );
}
