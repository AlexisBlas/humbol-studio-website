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
              humbol is a design studio built on a simple tension: go deep
              before you conclude, then commit to a clear position. We work at
              the intersection of research, systems thinking, and craft — for
              founders and organizations where design can actually make a
              difference.
            </p>
            <p>
              From SaaS products and consumer experiences to design systems for
              teams of every size — one designer, end to end, with no handoffs
              and nothing lost in translation.
            </p>
          </div>
        </SectionIntro>
      </Container>
    </section>
  );
}
