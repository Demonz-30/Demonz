"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (textRef.current && sectionRef.current) {
        const lines = textRef.current.querySelectorAll(".phil-line");
        
        gsap.fromTo(lines, 
          { opacity: 0, y: 50, filter: "blur(10px)", rotationX: -20 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            rotationX: 0,
            duration: 1.5,
            stagger: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            }
          }
        );
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll(".phil-line");
        gsap.set(lines, { opacity: 1, y: 0, filter: "none", rotationX: 0 });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 px-6 md:px-12 bg-background relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Atmospheric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-brand-purple opacity-10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div ref={textRef} className="flex flex-col gap-6 md:gap-12 perspective-1000">
          {content.philosophy.map((line, i) => {
            // Highlight the keyword in each line (Tools, Direction, Purpose)
            const words = line.split(" ");
            const lastWord = words.pop();
            const rest = words.join(" ");
            
            return (
              <div key={i} className="overflow-hidden">
                <h2 className="phil-line text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter text-white origin-bottom">
                  <span className="opacity-60">{rest} </span>
                  <span className="font-black text-brand-purple">{lastWord}</span>
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
