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

  // Route change scroll coordination: resets scroll and refreshes ScrollTrigger triggers cleanly
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(refreshTimer);
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
      window.scrollTo(0, 0);
    }

    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const unbind = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Refresh ScrollTrigger once Lenis is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      unbind();
      clearTimeout(timer);
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
    <ReactLenis root options={{ lerp: reducedMotion ? 1 : 0.08, duration: reducedMotion ? 0 : 1.5, syncTouch: false }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
