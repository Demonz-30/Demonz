import { Photography } from "@/components/sections/Photography";

export const metadata = {
  title: "CREATIVE | DEMONZ",
  description: "Visual storytelling, photography, and multimedia experiments by DEMONZ.",
};

export default function CreativePage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden min-h-screen">
      <Photography />
    </div>
  );
}
