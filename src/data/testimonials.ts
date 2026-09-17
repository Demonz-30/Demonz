export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  isPlaceholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "finora-collab",
    quote:
      "Engineered the core offline-first mobile architecture, biometric authentication, and multi-wallet balance synchronization for the Finora financial platform.",
    author: "Finora Core Team",
    role: "Engineering Collaboration",
    project: "Finora Mobile System",
    isPlaceholder: true,
  },
  {
    id: "demonz-coffee-collab",
    quote:
      "Orchestrated brand identity, digital ordering touchpoints, and retail operations rollout, bridging creative art direction with commercial execution.",
    author: "Demonz Coffee Stakeholders",
    role: "Venture Partner",
    project: "Demonz Coffee Brand & Retail",
    isPlaceholder: true,
  },
  {
    id: "gizvana-collab",
    quote:
      "Designed and developed the high-performance gaming gear catalog, real-time inventory tracking, and checkout flows with responsive micro-interactions.",
    author: "Gizvana Product Group",
    role: "Product & UI Architecture",
    project: "Gizvana E-Commerce Hub",
    isPlaceholder: true,
  },
];

