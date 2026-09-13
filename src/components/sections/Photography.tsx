"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Photography() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      // Horizontal Scroll for the gallery on desktop
      if (galleryRef.current && containerRef.current) {
        const panels = gsap.utils.toArray(".photo-panel");
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + galleryRef.current!.offsetWidth
          }
        });
      }

      // Title Parallax
      if (titleRef.current && containerRef.current) {
        gsap.to(titleRef.current, {
          y: 150,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  const photos = [
    { src: "/assets/projects/creative-multimedia.jpg", aspect: "aspect-square", scale: "w-[80vw] md:w-[40vw]" },
    { src: "/assets/photography/photo-1.jpg", aspect: "aspect-[3/4]", scale: "w-[70vw] md:w-[30vw]" },
    { src: "/assets/photography/photo-2.jpg", aspect: "aspect-video", scale: "w-[90vw] md:w-[45vw]" },
    { src: "/assets/photography/photo-3.jpg", aspect: "aspect-[4/5]", scale: "w-[60vw] md:w-[25vw]" },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden md:h-screen flex flex-col justify-center">
      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20 pointer-events-none">
        <h2 ref={titleRef} className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase text-white/5 mix-blend-screen leading-none">
          Visual<br/>Storytelling
        </h2>
      </div>

      <div className="w-full h-full flex items-center mt-24 md:mt-0">
        <div ref={galleryRef} className="flex flex-col md:flex-row flex-nowrap w-full md:w-auto h-full px-6 md:px-[20vw] gap-12 md:gap-32 items-center">
          {photos.map((photo, i) => (
            <div 
              key={i} 
              className={`photo-panel relative shrink-0 ${photo.scale} ${photo.aspect} group`}
              data-cursor="image"
            >
              <div className="w-full h-full relative overflow-hidden rounded-md">
                <Image 
                  src={photo.src} 
                  alt={`Photography ${i+1}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
