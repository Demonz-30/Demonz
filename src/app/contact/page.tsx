import { Contact } from "@/components/sections/Contact";

export const metadata = {
  title: "CONTACT | DEMONZ",
  description: "Let's create something. Start a project with DEMONZ.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden min-h-screen">
      <Contact />
    </div>
  );
}
