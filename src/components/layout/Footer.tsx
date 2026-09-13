"use client";

import { content } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-black pt-12 pb-8 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-white/40 gap-4 md:gap-0">
        <p>&copy; {new Date().getFullYear()} {content.footer.copyright}. All rights reserved.</p>
        <p>{content.footer.message}</p>
      </div>
    </footer>
  );
}
