import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  return (
    <section
      id="contact"
      className="w-full scroll-mt-16 pt-8 pb-28 md:pt-12 md:pb-36"
    >
      <Container>
        <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-4 text-center">
          <SectionLabel>Let&apos;s work together</SectionLabel>
          <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
            Have a product that needs shaping?
          </h2>
          <p className="text-headline-md font-bold leading-8 text-slate">
            Let&apos;s find out if we&apos;re a fit.
          </p>
          <p className="pt-2 text-body-md leading-6 text-pretty text-slate">
            humbol is{" "}
            <a
              href="https://alexisblas.work"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-bold text-interactive underline decoration-interactive/30 underline-offset-2 transition-colors hover:text-interactive-hover hover:decoration-interactive-hover"
            >
              one designer
            </a>
            , by&nbsp;design. I take on a small number of projects at
            a&nbsp;time — so every engagement gets real&nbsp;focus. If
            you&apos;re building something you believe&nbsp;in, I&apos;d like to
            hear&nbsp;about&nbsp;it.
          </p>
          <div className="mt-4 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="/contact"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-interactive px-6 py-3.5 text-base font-bold text-bg-primary transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-interactive-hover active:bg-interactive-pressed"
            >
              Start a conversation
            </a>
            <CalendlyButton />
          </div>
          <p className="text-label-caps font-medium text-slate">
            hello@humbol.studio · San Juan, Puerto Rico
          </p>
        </div>
      </Container>
    </section>
  );
}
