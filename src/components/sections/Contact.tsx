"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (textRef.current && sectionRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background grain & gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(112,0,255,0.15)_0%,rgba(0,0,0,1)_80%)] pointer-events-none"></div>

      <div ref={textRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-6 block">
          01 // COLLABORATION &amp; INQUIRY
        </span>
        <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] text-white uppercase mb-8">
          Let&apos;s<br />Create<br />Something.
        </h2>
        
        <p className="text-xl md:text-3xl font-light text-foreground-muted max-w-2xl text-balance mb-16">
          Have an idea, project, or concept?<br/>Let&apos;s turn it into something real.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-32">
          <MagneticButton 
            href={`mailto:${content.contact.email}`}
            className="bg-brand-purple text-white font-bold uppercase tracking-widest px-12 py-5 rounded-full text-lg hover:bg-brand-purple-light transition-colors duration-300"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton 
            href="/work"
            className="bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest px-12 py-5 rounded-full text-lg hover:bg-white/5 transition-colors duration-300"
          >
            View Projects
          </MagneticButton>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-16 w-full border-t border-white/10 pt-16">
          {Object.entries(content.contact).map(([platform, url]) => {
            const isEmail = platform === "email";
            const href = isEmail ? `mailto:${url}` : url;
            return (
              <a 
                key={platform} 
                href={href} 
                target={isEmail ? undefined : "_blank"} 
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="text-sm font-bold tracking-widest text-white/50 hover:text-white uppercase transition-colors"
              >
                {platform}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
