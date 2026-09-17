"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

import { usePathname } from "next/navigation";

function ScrollTriggerSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    let frame = 0;
    let secondFrame = 0;
    const refreshAfterLayout = () => {
      frame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    };

    refreshAfterLayout();

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname, lenis]);

  useEffect(() => {
    // Service worker unregister check to prevent stale localhost:3000 cache
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // Force manual scroll restoration so page refresh always starts cleanly at top
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    if (!lenis) return;

    // F-06: Disable GSAP lagSmoothing to prevent clock divergence during frame spikes
    gsap.ticker.lagSmoothing(0);

    // F-06: Drive Lenis from GSAP ticker (time provided in seconds, converted to ms)
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const unbind = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    return () => {
      gsap.ticker.remove(updateTicker);
      unbind();
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{ lerp: reducedMotion ? 1 : 0.08, duration: reducedMotion ? 0 : 1.5, syncTouch: false }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
