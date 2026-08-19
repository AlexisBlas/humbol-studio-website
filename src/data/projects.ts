import { caseStudies } from "@/data/case-studies";

export type Project = {
  id: string;
  title: string;
  tags: string;
  description: string;
  /** Optional cover image — falls back to gradient when omitted. */
  image?: string;
  gradient: string;
};

export const projects: Project[] = caseStudies.map((study) => ({
  id: study.slug,
  title: study.client,
  tags: study.cardTags,
  description: study.cardDescription,
  image: study.hero.src,
  gradient: study.gradient,
}));

/** Bento grid spans — asymmetric layout for four featured projects. */
export const projectBentoSpans = [
  "md:col-span-7 md:min-h-[600px]",
  "md:col-span-5 md:min-h-[600px]",
  "md:col-span-5 md:min-h-[600px]",
  "md:col-span-7 md:min-h-[600px]",
] as const;
