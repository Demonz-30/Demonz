"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

export function CaseStudyHeroMotion({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(".cs-reveal");
      
      gsap.fromTo(elements,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(".cs-reveal");
      gsap.set(elements, { opacity: 1, y: 0, filter: "none" });
    });

    return () => mm.revert();
  }, []);

  return <div ref={containerRef} className="w-full">{children}</div>;
}

