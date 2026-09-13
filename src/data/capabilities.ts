export interface PrimaryCapability {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  stack: string[];
}

export interface SupportingDiscipline {
  id: string;
  title: string;
  tagline: string;
  description: string;
  skills: string[];
}

export interface WhatIDoItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  skills: string[];
}

export const primaryCapabilities: PrimaryCapability[] = [
  {
    id: "01",
    title: "PRODUCT & WEB ENGINEERING",
    tagline: "Modern Web Applications & Component Systems",
    description:
      "Merancang aplikasi web modern yang responsif dengan arsitektur komponen modular, integrasi API, dan struktur frontend yang terorganisir.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Git & GitHub"
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Git & GitHub"
    ]
  },
  {
    id: "02",
    title: "MOBILE APPLICATION ARCHITECTURE",
    tagline: "Native Android & Cross-Platform Systems",
    description:
      "Membangun aplikasi mobile native dan cross-platform dengan fokus pada local persistence, offline-first behavior, sinkronisasi data, dan pengalaman aplikasi yang responsif.",
    technologies: [
      "Android SDK",
      "Kotlin",
      "SQLite / Room",
      "Flutter",
      "Dart",
      "Firebase"
    ],
    stack: [
      "Android SDK",
      "Kotlin",
      "SQLite / Room",
      "Flutter",
      "Dart",
      "Firebase"
    ]
  },
  {
    id: "03",
    title: "CREATIVE TECHNOLOGY & INTERACTIVE SYSTEMS",
    tagline: "WebGL, Canvas & Motion Systems",
    description:
      "Menggabungkan engineering dan visual melalui interactive canvas, 3D rendering, shader-based effects, dan motion systems pada pengalaman digital.",
    technologies: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "GSAP",
      "Canvas API",
      "UI/UX Architecture"
    ],
    stack: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "GSAP",
      "Canvas API",
      "UI/UX Architecture"
    ]
  },
  {
    id: "04",
    title: "AI-ASSISTED WORKFLOWS & AUTOMATION",
    tagline: "Intelligent Workflows & Process Automation",
    description:
      "Membangun workflow berbasis AI, parsing, application logic, scripting, dan automation untuk membantu proses digital menjadi lebih terstruktur dan efisien.",
    technologies: [
      "Python",
      "AI-Assisted Workflows",
      "Data Parsing",
      "Script Automation",
      "Application Logic"
    ],
    stack: [
      "Python",
      "AI-Assisted Workflows",
      "Data Parsing",
      "Script Automation",
      "Application Logic"
    ]
  }
];

export const supportingDisciplines: SupportingDiscipline[] = [
  {
    id: "A",
    title: "UI/UX & BRAND DESIGN SYSTEMS",
    tagline: "Design Systems & Visual Identity",
    description:
      "Merancang identitas visual, sistem desain, hierarki tipografi, dan antarmuka produk digital yang memiliki karakter visual konsisten.",
    skills: [
      "UI/UX Architecture",
      "Design Systems",
      "Typography & Layout",
      "Brand Identity",
      "Figma"
    ]
  },
  {
    id: "B",
    title: "MULTIMEDIA & PRODUCT EXPERIMENTS",
    tagline: "Visual Production & Real-world Experiments",
    description:
      "Menggabungkan produksi visual, photography, cinematography, content strategy, dan eksperimen produk nyata.",
    skills: [
      "Commercial Photography",
      "Cinematography",
      "Visual Storytelling",
      "Color Grading",
      "Content Strategy",
      "Product Strategy"
    ]
  }
];

export const allCapabilitiesWhatIDo: WhatIDoItem[] = [
  ...primaryCapabilities.map((p) => ({
    id: p.id,
    title: p.title,
    tagline: p.tagline,
    description: p.description,
    skills: p.technologies
  })),
  ...supportingDisciplines.map((s) => ({
    id: s.id,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    skills: s.skills
  }))
];

