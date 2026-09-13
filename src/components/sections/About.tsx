"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Image Cinematic Reveal
      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector("img");
        
        gsap.fromTo(imageRef.current, 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", filter: "blur(10px)" },
          { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
            filter: "blur(0px)",
            duration: 1.5, 
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );

        if (imgElement) {
          gsap.fromTo(imgElement,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
              }
            }
          );
          
          // Subtle Parallax
          gsap.to(imgElement, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      }

      // Text Sequence
      const texts = textRef.current?.querySelectorAll(".about-text");
      if (texts) {
        gsap.fromTo(texts, 
          { opacity: 0, y: 40, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const texts = textRef.current?.querySelectorAll(".about-text");
      if (texts) {
        texts.forEach((el) => gsap.set(el, { opacity: 1, y: 0, filter: "none" }));
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left: Editorial Portrait */}
        <div className="lg:col-span-5 relative w-full aspect-[3/4] md:aspect-[4/5]" data-cursor="image">
          <div ref={imageRef} className="w-full h-full relative overflow-hidden">
            <Image 
              src="/assets/media/portrait-main.webp" 
              alt="Demonz Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top origin-bottom"
            />
          </div>
          {/* Decorative Corner Accents */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-brand-purple-light/60"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-brand-purple-light/60"></div>
        </div>

        {/* Right: Text Content */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
          <span className="about-text text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
            01 // ABOUT &amp; PHILOSOPHY
          </span>
          
          <h1 className="about-text text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-balance mb-6 uppercase leading-[0.95] text-white">
            THE BUILDER MINDSET
          </h1>
          
          <p className="about-text text-lg md:text-2xl font-mono text-brand-purple-light mb-8">
            {content.about.heading}
          </p>
          
          <div className="flex flex-col gap-6 text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl border-l-2 border-white/10 pl-6">
            {content.about.paragraphs.map((p, i) => (
              <p key={i} className="about-text text-balance">{p}</p>
            ))}
          </div>

          {/* 3 Core Philosophy Principles */}
          <div className="about-text space-y-4 my-8 border-l-2 border-brand-purple/40 pl-6">
            {content.philosophy.map((line, i) => (
              <p key={i} className="text-sm md:text-base font-mono text-zinc-300">
                <span className="text-brand-purple-light mr-3">0{i + 1}.</span>
                {line}
              </p>
            ))}
          </div>
          
          <div className="about-text mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-white font-mono">04</span>
              <span className="text-xs tracking-widest uppercase text-brand-purple-light mt-1 font-mono">Core Disciplines</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-white font-mono">06</span>
              <span className="text-xs tracking-widest uppercase text-brand-purple-light mt-1 font-mono">Total Domains</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-white font-mono">100%</span>
              <span className="text-xs tracking-widest uppercase text-brand-purple-light mt-1 font-mono">Hands-on Builder</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
