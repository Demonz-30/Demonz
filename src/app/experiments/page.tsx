import { ExperimentsPlayground } from "@/components/sections/ExperimentsPlayground";

export const metadata = {
  title: "EXPERIMENTS | DEMONZ",
  description: "Technical creativity, exploring AI, creative engineering, motion systems, and interactive web fragments.",
};

export default function ExperimentsPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden min-h-screen">
      <ExperimentsPlayground />
    </div>
  );
}
