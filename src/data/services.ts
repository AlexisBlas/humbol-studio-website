export type Service = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "ux-product",
    title: "UX & Product Design",
    label: "UX & Product",
    icon: "/icons/compass.svg",
    description:
      "I map the problem before I touch a screen. From discovery to shipped product — built to hold up under real use.",
  },
  {
    id: "design-systems",
    title: "Design Systems",
    label: "Systems",
    icon: "/icons/layers.svg",
    description:
      "Consistency at scale. I build component libraries, define design tokens, and write documentation your team will actually open.",
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Design",
    label: "Web & Mobile",
    icon: "/icons/devices.svg",
    description:
      "Interfaces that feel native to their platform and right for their users. Clean, intentional, and built with the handoff already in mind.",
  },
  {
    id: "saas",
    title: "SaaS Product Design",
    label: "SaaS",
    icon: "/icons/dashboard.svg",
    description:
      "The surfaces where UX decisions have real business consequences — dashboards, onboarding, billing, permissions. I've designed these before. I know where things go wrong.",
  },
];
