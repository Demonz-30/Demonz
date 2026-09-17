"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  selector: string;
  stagger?: number;
  y?: number;
  mobileY?: number;
}

export function useScrollReveal<T extends HTMLElement>({
  selector,
  stagger = 0.08,
  y = 32,
  mobileY = 24,
}: ScrollRevealOptions) {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));
      if (!elements.length) return;

      const offset = window.matchMedia("(max-width: 767px)").matches ? mobileY : y;
      const context = gsap.context(() => {
        elements.forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: offset },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: index * stagger,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      }, root);

      return () => context.revert();
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(root.querySelectorAll<HTMLElement>(selector), { opacity: 1, y: 0 });
    });

    return () => media.revert();
  }, [mobileY, selector, stagger, y]);

  return rootRef;
}
