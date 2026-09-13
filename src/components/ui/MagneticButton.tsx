"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

import { TransitionLink } from "@/components/layout/PageTransition";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const button = buttonRef.current;
      if (!button) return;

      const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const { clientX, clientY } = mouseEvent;
        const { height, width, left, top } = button.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        // Intensity scale
        xTo(x * 0.4);
        yTo(y * 0.4);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
  }, []);

  const isInternalLink = href && href.startsWith("/") && !href.startsWith("//");

  if (isInternalLink) {
    return (
      <TransitionLink
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn("relative inline-flex items-center justify-center p-4", className)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </TransitionLink>
    );
  }

  const Component = href ? "a" : "button";
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={buttonRef as React.LegacyRef<HTMLButtonElement & HTMLAnchorElement>}
      className={cn("relative inline-flex items-center justify-center p-4", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
}
