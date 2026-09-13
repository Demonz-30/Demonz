import { About } from "@/components/sections/About";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Approach } from "@/components/sections/Approach";

export const metadata = {
  title: "ABOUT | DEMONZ",
  description: "I create. I build. I experiment. Discover the creative technologist behind DEMONZ.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden min-h-screen">
      <About />
      <WhatIDo />
      <Approach />
    </div>
  );
}
