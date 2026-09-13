"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!containerRef.current) return;
      
      const steps = stepsRef.current.filter(Boolean);
      
      // Pin the section and animate steps sequentially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1
        }
      });

      steps.forEach((step, i) => {
        const isLast = i === steps.length - 1;
        
        // Enter
        tl.fromTo(step, 
          { opacity: 0, scale: 0.8, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        
        // Hold and Exit (if not last)
        if (!isLast) {
          tl.to(step, { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1, ease: "power2.in" });
        }
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const steps = stepsRef.current.filter(Boolean);
      steps.forEach((step) => {
        if (step) {
          gsap.set(step, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "none"
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-surface relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(112,0,255,0.05)_0%,rgba(5,5,5,1)_70%)] pointer-events-none z-0"></div>
      
      <div className="absolute top-12 left-6 md:left-12 z-10">
        <h2 className="text-sm font-bold tracking-widest text-brand-purple uppercase">{content.approach.heading}</h2>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center h-full">
        {content.approach.steps.map((step, index) => (
          <div 
            key={step.id} 
            ref={el => { stepsRef.current[index] = el; }}
            className="absolute flex flex-col items-center justify-center text-center opacity-0"
          >
            <span className="text-xl md:text-2xl font-mono text-brand-purple mb-6 border border-brand-purple/30 px-6 py-2 rounded-full bg-surface/50 backdrop-blur-md">
              {step.id}
            </span>
            <h3 className="text-6xl md:text-[10vw] font-black tracking-tighter uppercase text-white drop-shadow-2xl">
              {step.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
