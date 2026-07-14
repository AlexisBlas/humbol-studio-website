export type Project = {
  id: string;
  title: string;
  tags: string;
  description: string;
  /** Optional cover image — falls back to gradient when omitted. */
  image?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "system-thinking-at-scale",
    title: "System Thinking at Scale",
    tags: "Design System · SaaS · Multi-brand",
    description:
      "Three products. Three brand identities. No shared foundation. I built the system that connected them — tokens, components, and documentation — so the team could ship faster without losing consistency across product lines.",
    gradient: "from-indigo-deep via-interactive to-interactive-hover",
  },
  {
    id: "microjuris",
    title: "MicroJuris",
    tags: "Product Redesign · Legal Tech · UX",
    description:
      "Legal research has been dense and unforgiving for decades. I redesigned MicroJuris from the ground up — simplifying navigation, restructuring content hierarchies, and reducing the cognitive load of finding what actually matters.",
    gradient: "from-graphite via-iron to-iron-slate",
  },
  {
    id: "uva-dispatch-dashboard",
    title: "UVA Dispatch Dashboard",
    tags: "Dashboard · Operations · End-to-end",
    description:
      "Two user types. One system that had to serve both. I designed the dispatch dashboard and the delivery flow — connecting restaurant operators and drivers into a shared experience that actually worked end to end.",
    gradient: "from-iron-slate via-slate to-steel",
  },
  {
    id: "caribbean-cinemas",
    title: "Caribbean Cinemas",
    tags: "Consumer · Mobile · Experience Design",
    description:
      "Going to the movies should feel like an event. I redesigned the experience from search to seat — removing friction at every decision point and putting the anticipation back into the process.",
    gradient: "from-[#1a3a4a] via-[#2d6a7a] to-[#7eb8c9]",
  },
];

/** Bento grid spans — asymmetric layout for four featured projects. */
export const projectBentoSpans = [
  "md:col-span-7 md:min-h-[600px]",
  "md:col-span-5 md:min-h-[600px]",
  "md:col-span-5 md:min-h-[600px]",
  "md:col-span-7 md:min-h-[600px]",
] as const;
