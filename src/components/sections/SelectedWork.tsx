import { projects, projectBentoSpans } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() {
  return (
    <section id="work" className="w-full pt-20">
      <Container className="grid grid-cols-1 gap-gutter pb-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel>Selected work</SectionLabel>
        </div>
        <div className="flex flex-col gap-4 md:col-span-8">
          <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
            Work that earned its place here.
          </h2>
          <p className="max-w-[815px] text-[19px] leading-[1.5] text-iron">
            A few projects that tell the story better than we can.
          </p>
        </div>
      </Container>

      <div className="w-full px-margin-mobile pb-20 md:px-stack-lg">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={projectBentoSpans[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
