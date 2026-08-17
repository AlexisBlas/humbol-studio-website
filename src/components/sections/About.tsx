import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionRow";

export function About() {
  return (
    <section id="about" className="w-full scroll-mt-16 pt-20">
      <Container className="pb-32 md:pb-40">
        <SectionIntro
          title={
            <>
              Humble in approach.
              <br />
              Bold in execution.
            </>
          }
        >
          <div className="flex flex-col gap-4 text-body-md leading-6 text-iron">
            <p>
              Twenty years of intentional design — across studios, agencies, and
              direct partnerships.
            </p>
            <p>
              humbol is a design studio built on a simple tension: humble enough
              to go deep, bold enough to take a position. Research, systems
              thinking, and craft — for founders and organizations where design
              carries real weight.
            </p>
            <p>
              SaaS products, consumer experiences, design systems that scale.
              One designer sees it all through, so the person who hears your
              problem is the person who ships the solution.
            </p>
          </div>
        </SectionIntro>
      </Container>
    </section>
  );
}
