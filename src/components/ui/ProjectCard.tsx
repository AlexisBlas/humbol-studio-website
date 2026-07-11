import Image from "next/image";
import type { Project } from "@/data/projects";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <a
      href="#"
      aria-label={`View case study for ${project.title} — coming soon`}
      className={cn(
        "group relative block min-h-[400px] overflow-hidden rounded-3xl md:min-h-[600px]",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            project.gradient,
          )}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-graphite/45 to-graphite/10 transition-[background] duration-300 ease-out group-hover:from-graphite group-hover:via-graphite/65 group-focus-within:from-graphite group-focus-within:via-graphite/65"
        aria-hidden="true"
      />

      <div className="relative flex h-full min-h-[inherit] flex-col justify-end gap-3 p-6 md:gap-4 md:p-8">
        <p className="text-label-caps font-bold uppercase tracking-[0.08em] text-iron-text/80">
          {project.tags}
        </p>
        <h3 className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-[32px]">
          {project.title}
        </h3>
        <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100">
          <p className="max-w-[52ch] overflow-hidden text-sm leading-6 text-iron-text/90 md:text-base md:leading-7">
            {project.description}
          </p>
        </div>
        <span className="mt-1 flex items-center gap-2 text-sm font-bold text-white transition-opacity group-hover:opacity-80 md:text-base">
          View case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
        </span>
      </div>
    </a>
  );
}
