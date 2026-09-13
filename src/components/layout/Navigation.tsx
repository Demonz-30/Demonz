"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/layout/PageTransition";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const isHiddenRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (!navRef.current) return;
      
      const scrolledPastTop = currentScroll > 50;
      setIsScrolled((prev) => (prev !== scrolledPastTop ? scrolledPastTop : prev));

      if (currentScroll > 100) {
        if (currentScroll > lastScroll.current && currentScroll - lastScroll.current > 5) {
          // Scrolling down
          if (!isHiddenRef.current) {
            isHiddenRef.current = true;
            gsap.to(navRef.current, { y: "-100%", duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
          }
        } else if (lastScroll.current - currentScroll > 5) {
          // Scrolling up
          if (isHiddenRef.current) {
            isHiddenRef.current = false;
            gsap.to(navRef.current, { y: "0%", duration: 0.35, ease: "power3.out", overwrite: "auto" });
          }
        }
      } else {
        // Near top of page
        if (isHiddenRef.current) {
          isHiddenRef.current = false;
          gsap.to(navRef.current, { y: "0%", duration: 0.35, ease: "power3.out", overwrite: "auto" });
        }
      }
      lastScroll.current = currentScroll;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { clipPath: "circle(150% at right top)", duration: 0.8, ease: "power4.inOut" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menuRef.current, { clipPath: "circle(0% at right top)", duration: 0.8, ease: "power4.inOut" });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const links = [
    { label: "ABOUT", href: "/about" },
    { label: "WORK", href: "/work" },
    { label: "CREATIVE", href: "/creative" },
    { label: "EXPERIMENTS", href: "/experiments" },
    { label: "CONTACT", href: "/contact" }
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/work") {
      return pathname === "/work" || pathname.startsWith("/work/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300 transform-gpu",
          isScrolled 
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 shadow-lg" 
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        )}
      >
        <TransitionLink href="/" className="relative z-[60] flex items-center gap-4 group cursor-pointer" data-cursor="hover">
          <div className="w-10 h-10 relative flex items-center justify-center overflow-hidden rounded-md border border-white/10 shadow-lg">
            <Image src="/assets/brand/demonz-logo.jpg" alt="DEMONZ Logo" fill sizes="40px" className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
          </div>
          <span className="font-bold tracking-widest text-sm hidden md:block group-hover:text-brand-purple transition-colors duration-300">DEMONZ</span>
        </TransitionLink>

        <div className="hidden md:flex gap-10 items-center">
          {links.map(link => {
            const active = isLinkActive(link.href);
            return (
              <TransitionLink 
                key={link.label} 
                href={link.href}
                className={cn(
                  "text-xs font-bold tracking-widest transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-brand-purple after:transition-transform after:origin-left after:duration-300",
                  active 
                    ? "text-white after:scale-x-100" 
                    : "text-white/60 hover:text-brand-purple after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {link.label}
              </TransitionLink>
            );
          })}
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-[60] w-12 h-12 flex flex-col justify-center items-center gap-2 focus:outline-none bg-surface/50 rounded-full border border-white/5 backdrop-blur-md"
        >
          <span className={cn("w-5 h-[1px] bg-white transition-transform origin-center duration-500", menuOpen && "rotate-45 translate-y-[9px]")} />
          <span className={cn("w-5 h-[1px] bg-white transition-opacity duration-500", menuOpen && "opacity-0")} />
          <span className={cn("w-5 h-[1px] bg-white transition-transform origin-center duration-500", menuOpen && "-rotate-45 -translate-y-[9px]")} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 md:hidden"
        style={{ clipPath: "circle(0% at right top)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        {links.map(link => {
          const active = isLinkActive(link.href);
          return (
            <TransitionLink 
              key={link.label} 
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-4xl font-black uppercase tracking-tighter transition-colors duration-300",
                active ? "text-brand-purple" : "text-white hover:text-brand-purple"
              )}
            >
              {link.label}
            </TransitionLink>
          );
        })}
      </div>
    </>
  );
}
