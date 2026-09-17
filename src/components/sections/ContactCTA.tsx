"use client";

import { content } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TransitionLink } from "@/components/layout/PageTransition";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function ContactCTA() {
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: "[data-home-reveal]",
    stagger: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 md:py-40 px-6 md:px-12 bg-background relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        <span
          data-home-reveal
          className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block"
        >
          03 // COLLABORATION &amp; ACTION
        </span>

        <h2
          data-home-reveal
          className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-5 max-w-3xl"
        >
          LET&apos;S BUILD SOMETHING.
        </h2>

        <p
          data-home-reveal
          className="text-sm md:text-base text-zinc-400 font-light max-w-xl mb-10"
        >
          Open for product engineering, mobile platform architecture, and creative technology initiatives.
        </p>

        {/* Action Buttons */}
        <div
          data-home-reveal
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <MagneticButton
            href="/contact"
            className="px-9 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-brand-purple/25 flex items-center gap-2"
          >
            <span>Get in Touch</span>
            <span>→</span>
          </MagneticButton>

          <MagneticButton
            href="/work"
            className="px-9 py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300"
          >
            Explore Work
          </MagneticButton>
        </div>

        {/* Direct Channels */}
        <div
          data-home-reveal
          className="flex flex-wrap justify-center gap-6 md:gap-10 border-t border-white/10 pt-10 w-full max-w-xl"
        >
          {Object.entries(content.contact).map(([platform, url]) => {
            const isEmail = platform === "email";
            const href = isEmail ? `mailto:${url}` : url;

            return (
              <a
                key={platform}
                href={href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                {platform}
              </a>
            );
          })}
        </div>

        {/* Link to dedicated contact route */}
        <div data-home-reveal className="mt-8">
          <TransitionLink
            href="/contact"
            className="text-xs font-mono text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-wider"
          >
            Go to Dedicated Contact Page ↗
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
