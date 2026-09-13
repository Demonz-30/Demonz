"use client";

import { content } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TransitionLink } from "@/components/layout/PageTransition";

export function ContactCTA() {
  return (
    <section id="contact" className="py-32 md:py-44 px-6 md:px-12 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
          05 // COLLABORATION &amp; CONTACT
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase mb-6 max-w-4xl">
          HAVE AN IDEA?<br />LET&apos;S BUILD IT.
        </h2>

        <p className="text-base md:text-xl text-zinc-400 font-light max-w-xl mb-12">
          Open for product engineering, full-stack application development, and creative technology initiatives.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-16">
          <MagneticButton
            href={`mailto:${content.contact.email}`}
            className="px-10 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-light text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-purple/25"
          >
            Start a Conversation →
          </MagneticButton>

          <MagneticButton
            href="/work"
            className="px-10 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300"
          >
            Explore Full Portfolio
          </MagneticButton>
        </div>

        {/* Quick Channels */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 border-t border-white/10 pt-12 w-full max-w-2xl">
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
        <div className="mt-8">
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

