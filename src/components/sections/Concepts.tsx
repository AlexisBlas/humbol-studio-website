import { SectionRow } from "@/components/ui/SectionRow";

const projects = [
  {
    title: "Garaje",
    type: "Concept Design",
    tags: "Brand, Web Design, Automotive",
    year: "2026",
    href: "https://alfa-romeo-fawn.vercel.app",
  },
  {
    title: "Sundae Physics",
    type: "Concept Design",
    tags: "Brand, Web Design, Motion",
    year: "2026",
    href: "https://sundae-physics.vercel.app",
  },
] as const;

export function Concepts() {
  return (
    <SectionRow id="projects" label="Projects">
      <ul className="w-full border-t border-stone">
        {projects.map((project) => (
          <li key={project.href} className="border-b border-stone">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:py-10"
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite transition-colors group-hover:text-interactive md:text-[33px]">
                  {project.title}
                </span>
                <span className="text-sm leading-5 text-iron">{project.type}</span>
              </span>
              <span className="shrink-0 text-sm leading-5 text-iron sm:pb-0.5 sm:text-right">
                {project.tags}, <span className="text-steel">{project.year}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SectionRow>
  );
}
