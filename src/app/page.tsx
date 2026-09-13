import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Capabilities } from "@/components/sections/Capabilities";
import { LabTeaser } from "@/components/sections/LabTeaser";
import { AboutSummary } from "@/components/sections/AboutSummary";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      <Preloader />
      <Hero />
      <SelectedWork />
      <Capabilities />
      <LabTeaser />
      <AboutSummary />
      <ContactCTA />
    </div>
  );
}

