import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionRow";
import { ServicesField } from "@/components/sections/ServicesField";

export function Services() {
  return (
    <section id="services" className="w-full scroll-mt-16 pb-10 md:pb-12">
      <Container>
        <SectionIntro
          title={
            <>
              Research-grounded.
              <br />
              Ship-ready.
            </>
          }
        >
          <p className="max-w-[42rem] text-body-md leading-6 text-iron">
            Every engagement starts with understanding. Every deliverable is
            designed to be built, not just presented.
          </p>
        </SectionIntro>
        <div className="mt-12 md:mt-16">
          <ServicesField />
        </div>
      </Container>
    </section>
  );
}
