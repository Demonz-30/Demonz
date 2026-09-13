"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allCapabilitiesWhatIDo } from "@/data/capabilities";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/layout/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="what-i-do" ref={sectionRef} className="py-32 md:py-44 px-6 md:px-12 bg-surface/20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[90rem] mx-auto">
        {/* Section Header */}
        <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-purple-light uppercase mb-4 block">
              02 // CAPABILITIES &amp; DISCIPLINES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
              COMPREHENSIVE EXPERTISE
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 max-w-md font-light">
            Multidisciplinary technical and creative capabilities engineered for modern products and digital experiences.
          </p>
        </div>
        
        <div className="flex flex-col border-t border-white/10">
          {allCapabilitiesWhatIDo.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={item.id}
                className="group relative border-b border-white/10 cursor-pointer overflow-hidden transition-all duration-500"
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onClick={() => isMobile && setActiveIndex(isActive ? null : index)}
                data-cursor="hover"
              >
                {/* Interactive Background */}
                <div className={cn(
                  "absolute inset-0 bg-brand-purple/[0.04] transition-opacity duration-500 ease-out z-0 pointer-events-none",
                  isActive ? "opacity-100" : "opacity-0"
                )}></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between p-6 md:p-10 gap-6">
                  <div className="flex items-start md:items-center gap-6 md:gap-8 lg:w-5/12">
                    <span className={cn(
                      "text-sm md:text-base font-mono transition-colors duration-300",
                      isActive ? "text-brand-purple-light font-bold" : "text-white/30"
                    )}>[{item.id}]</span>
                    <div>
                      <h3 className={cn(
                        "text-2xl md:text-4xl font-black tracking-tighter uppercase transition-colors duration-300",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      )}>{item.title}</h3>
                      <p className="text-xs md:text-sm font-mono text-brand-purple-light mt-1 uppercase tracking-wider">{item.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-7/12 flex flex-col gap-4">
                    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map(skill => (
                        <span 
                          key={skill}
                          className="text-xs font-mono border border-white/10 px-3 py-1 rounded-md text-zinc-300 bg-surface/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hover Accent Line */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-brand-purple transition-all duration-500 ease-out z-20",
                  isActive ? "w-full" : "w-0"
                )}></div>
              </div>
            );
          })}
        </div>

        {/* Action Link to Work */}
        <div className="mt-16 pt-8 flex justify-center">
          <TransitionLink
            href="/work"
            className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>See Capabilities Applied in Work Archive</span>
            <span className="text-brand-purple-light">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
