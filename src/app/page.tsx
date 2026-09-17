import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { WhatTheySay } from "@/components/sections/WhatTheySay";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      <Preloader />
      <Hero />
      <WhatTheySay />
      <ContactCTA />
    </div>
  );
}
