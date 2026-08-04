import { SectionRow } from "@/components/ui/SectionRow";

const projects = [
  {
    title: "Garaje",
    tags: "Brand, Web Design, Automotive, Concept Design",
    year: "2026",
    href: "https://alfa-romeo-fawn.vercel.app",
  },
  {
    title: "Sundae Physics",
    tags: "Brand, Web Design, Motion, Concept Design",
    year: "2026",
    href: "https://sundae-physics.vercel.app",
  },
] as const;

export function Concepts() {
  return (
    <SectionRow id="projects" label="Projects">
      <ul className="border-t border-stone">
        {projects.map((project) => (
          <li key={project.href} className="border-b border-stone">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-8 transition-colors md:py-10"
            >
              <span className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite transition-colors group-hover:text-interactive md:text-[33px]">
                {project.title}
              </span>
              <span className="text-sm leading-5 text-iron">
                {project.tags},{" "}
                <span className="text-steel">{project.year}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SectionRow>
  );
}
