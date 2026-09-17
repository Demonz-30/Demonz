"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkSupport = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setEnabled(!isCoarse && !prefersReduced);
      setEnabled(!isCoarse && !isMobile && !prefersReduced);
    };

    checkSupport();
    window.addEventListener("resize", checkSupport);
    return () => window.removeEventListener("resize", checkSupport);
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !textRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button']");
      const isProject = target.closest("[data-cursor='project']");
      const isImage = target.closest("[data-cursor='image']");

      if (isProject) {
        gsap.to(cursorRef.current, { scale: 5, backgroundColor: "#7000FF", mixBlendMode: "normal", duration: 0.3 });
        gsap.to(textRef.current, { opacity: 1, scale: 0.2, duration: 0.2 });
        textRef.current!.innerText = "VIEW";
      } else if (isImage) {
        gsap.to(cursorRef.current, { scale: 3, backgroundColor: "rgba(112, 0, 255, 0.2)", backdropFilter: "blur(4px)", mixBlendMode: "normal", duration: 0.3 });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      } else if (isLink) {
        gsap.to(cursorRef.current, { scale: 2.5, backgroundColor: "transparent", border: "1px solid #7000FF", mixBlendMode: "difference", duration: 0.3 });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#7000FF", border: "0px solid transparent", backdropFilter: "blur(0px)", mixBlendMode: "difference", duration: 0.3 });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-3 h-3 rounded-full bg-brand-purple mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center",
        "transition-colors -translate-x-1/2 -translate-y-1/2"
      )}
    >
      <span ref={textRef} className="text-white font-bold tracking-widest opacity-0 text-[10px] pointer-events-none absolute text-center">
        VIEW
      </span>
    </div>
  );
}
