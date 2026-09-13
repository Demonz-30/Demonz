"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Fail-safe timeout: ensure overlay is never permanently visible (disaster recovery)
    const safetyTimer = setTimeout(() => {
      setComplete(true);
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
    }, 3500);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true);
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });

      // Quick punchy sequence (~1.1s total)
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      )
      .to({}, { duration: 0.3 }) // punchy hold
      .to(textRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: "power3.in"
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: "power4.inOut"
      }, "-=0.1");
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      setComplete(true);
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      mm.revert();
    };
  }, []);

  if (complete) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <div 
        ref={overlayRef} 
        className="absolute inset-0 w-full h-full bg-black border-b border-brand-purple/20"
      ></div>
      <div className="relative z-10 overflow-hidden">
        <div 
          ref={textRef} 
          className="text-white font-mono text-xs md:text-sm tracking-[0.3em] uppercase mix-blend-difference"
        >
          {"DEMONZ — INITIALIZING"}
        </div>
      </div>
    </div>
  );
}
