import { Projects } from "@/components/sections/Projects";

export const metadata = {
  title: "WORK | DEMONZ",
  description: "Explore selected digital products, applications, and creative works by DEMONZ.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden min-h-screen">
      <Projects />
    </div>
  );
}
