import { projects } from "./projects";
import { allCapabilitiesWhatIDo } from "./capabilities";
export * from "./projects";
export * from "./capabilities";

export const content = {
  hero: {
    title: "DEMONZ",
    subtitle: "Creative Technologist & Entrepreneur",
    message: "I build digital products, visual identities, multimedia content, and real-world businesses by combining technology, creativity, and entrepreneurial thinking.",
  },
  about: {
    heading: "I create. I build. I experiment.",
    paragraphs: [
      "I'm Demonz — a multidisciplinary creator, developer, designer, photographer, multimedia creator, and entrepreneur.",
      "My work sits between technology, creativity, and business.",
      "I enjoy turning ideas into something real — whether it's a website, application, brand, photograph, video, digital product, or business.",
      "I don't limit myself to one discipline.",
      "I learn, experiment, build, and create."
    ]
  },
  whatIDo: allCapabilitiesWhatIDo,
  projects,
  nav: [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "WORK", href: "/work" },
    { label: "CREATIVE", href: "/creative" },
    { label: "EXPERIMENTS", href: "/experiments" },
    { label: "CONTACT", href: "/contact" }
  ],
  approach: {
    heading: "MY APPROACH",
    tagline: "Learn → Experiment → Build → Improve",
    steps: [
      { id: "01", title: "LEARN" },
      { id: "02", title: "EXPERIMENT" },
      { id: "03", title: "BUILD" },
      { id: "04", title: "IMPROVE" }
    ]
  },
  tools: [
    "TypeScript", "React", "Next.js", "Kotlin", "Flutter", "Python", 
    "Three.js", "Tailwind CSS", "Firebase", "SQLite", "Figma", "Git & GitHub"
  ],
  currentlyExploring: ["AI & AUTOMATION", "CREATIVE DEVELOPMENT", "MULTIMEDIA", "PRODUCT ARCHITECTURE"],
  philosophy: [
    "Technology gives me the tools.",
    "Creativity gives me the direction.",
    "Business gives the idea a purpose."
  ],
  contact: {
    instagram: "https://www.instagram.com/demonzdev",
    email: "demonzdev01@gmail.com",
    whatsapp: "https://wa.me/6289675210655",
    github: "https://github.com/Demonz-30",
    linkedin: "https://www.linkedin.com/in/muhammad-munir-alfaruq-283b0b367"
  },
  footer: {
    brand: "DEMONZ",
    tagline: "Creative Technologist & Entrepreneur",
    categories: ["IT", "Design", "Photography", "Multimedia", "Business"],
    message: "Building ideas into reality.",
    copyright: "Demonz Development"
  }
};
