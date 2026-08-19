import type { CaseStudy, CaseStudyBlock } from "@/data/case-studies";
import { getNextCaseStudy } from "@/data/case-studies";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseStudyGallery } from "@/components/case-study/CaseStudyGallery";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { CaseStudyReveal } from "@/components/case-study/CaseStudyReveal";
import { cn } from "@/lib/utils";

type CaseStudyTemplateProps = {
  study: CaseStudy;
};

export function CaseStudyTemplate({ study }: CaseStudyTemplateProps) {
  const next = getNextCaseStudy(study.slug);

  return (
    <article>
      <header className="pt-28 pb-16 md:pt-36 md:pb-24">
        <Container>
          <CaseStudyReveal>
            <div className="flex max-w-[58rem] flex-col gap-8">
              <SectionLabel>Case study</SectionLabel>
              <h1 className="text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-graphite md:text-[3.5rem] lg:text-[4rem]">
                {study.headline}
              </h1>
              <p className="max-w-[54ch] text-[19px] leading-[1.5] text-iron">
                {study.summary}
              </p>
            </div>
          </CaseStudyReveal>

          <CaseStudyReveal delay={0.08}>
            <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-stone pt-8 sm:grid-cols-3 sm:gap-12">
              <MetaItem label="Industry" value={study.meta.industry} />
              <MetaItem label="Market" value={study.meta.market} />
              <MetaItem label="Our services" value={study.meta.services} />
            </dl>
          </CaseStudyReveal>
        </Container>
      </header>

      <CaseStudyReveal>
        <div className="px-margin-mobile md:px-stack-lg">
          <CaseStudyImage {...study.hero} priority sizes="100vw" />
        </div>
      </CaseStudyReveal>

      <div className="flex flex-col gap-24 py-24 md:gap-32 md:py-32">
        {study.blocks.map((block, index) => (
          <Block key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      <section className="pb-24 md:pb-32">
        <Container>
          <CaseStudyReveal>
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-x-16">
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite md:col-span-5 md:text-[40px]">
                {study.closing.heading}
              </h2>
              <div className="flex max-w-[54ch] flex-col gap-4 text-body-lg leading-7 text-iron md:col-span-7">
                {study.closing.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </CaseStudyReveal>
        </Container>
      </section>

      <section className="border-t border-stone py-16 md:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex max-w-[36rem] flex-col gap-3">
              <SectionLabel>Next</SectionLabel>
              <p className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
                Have a product that needs shaping?
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-interactive px-6 py-3.5 text-base font-bold text-bg-primary transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-interactive-hover active:scale-[0.98] active:bg-interactive-pressed"
            >
              Start a conversation
            </a>
          </div>
        </Container>
      </section>

      {next ? (
        <a
          href={`/work/${next.slug}`}
          className="group relative block min-h-[280px] overflow-hidden bg-graphite md:min-h-[360px]"
          aria-label={`Next case study: ${next.client}`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-iron via-graphite to-indigo-deep opacity-80 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            aria-hidden="true"
          />
          <Container className="relative flex min-h-[280px] flex-col justify-end gap-4 py-12 md:min-h-[360px] md:py-16">
            <p className="text-label-caps font-bold uppercase tracking-[0.08em] text-iron-text/70">
              Next case study
            </p>
            <div className="flex items-end justify-between gap-6">
              <h2 className="max-w-[20ch] text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px]">
                {next.headline}
              </h2>
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 md:flex">
                <ArrowRight className="h-6 w-6" />
              </span>
            </div>
          </Container>
        </a>
      ) : null}
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
        {label}
      </dt>
      <dd className="text-base font-bold leading-6 text-graphite">{value}</dd>
    </div>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "narrative":
      return (
        <Container>
          <CaseStudyReveal>
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-x-16">
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite md:col-span-5 md:text-[40px]">
                {block.heading}
              </h2>
              <div className="flex max-w-[54ch] flex-col gap-4 text-body-lg leading-7 text-iron md:col-span-7">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </CaseStudyReveal>
        </Container>
      );

    case "fullBleed":
      return (
        <CaseStudyReveal>
          <div className="px-margin-mobile md:px-stack-lg">
            <CaseStudyImage {...block.image} sizes="100vw" />
          </div>
        </CaseStudyReveal>
      );

    case "split":
      return (
        <Container>
          <CaseStudyReveal>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
              <div
                className={cn(
                  "md:col-span-6",
                  block.imageSide === "left" ? "md:order-1" : "md:order-2",
                )}
              >
                <CaseStudyImage
                  {...block.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col gap-5 md:col-span-6",
                  block.imageSide === "left" ? "md:order-2" : "md:order-1",
                )}
              >
                <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite md:text-[36px]">
                  {block.heading}
                </h2>
                <div className="flex max-w-[48ch] flex-col gap-4 text-body-lg leading-7 text-iron">
                  {block.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudyReveal>
        </Container>
      );

    case "pair":
      return (
        <CaseStudyReveal>
          <div className="grid grid-cols-1 gap-4 px-margin-mobile md:grid-cols-2 md:gap-6 md:px-stack-lg">
            {block.images.map((image) => (
              <CaseStudyImage
                key={image.src}
                {...image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
        </CaseStudyReveal>
      );

    case "deliverables":
      return (
        <Container>
          <CaseStudyReveal>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-x-16">
              <div className="flex flex-col gap-5 md:col-span-5">
                <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite md:text-[40px]">
                  {block.heading}
                </h2>
                <p className="max-w-[42ch] text-body-lg leading-7 text-iron">
                  {block.body}
                </p>
              </div>
              <ul className="divide-y divide-stone border-t border-stone md:col-span-7">
                {block.items.map((item) => (
                  <li key={item.title} className="flex flex-col gap-2 py-6">
                    <p className="text-lg font-bold leading-6 text-graphite">
                      {item.title}
                    </p>
                    <p className="max-w-[52ch] text-body-md leading-6 text-iron">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </CaseStudyReveal>
        </Container>
      );

    case "gallery":
      return (
        <CaseStudyReveal>
          <CaseStudyGallery images={block.images} />
        </CaseStudyReveal>
      );

    case "quote":
      return (
        <Container>
          <CaseStudyReveal>
            <blockquote className="relative max-w-[46rem] border-l-[3px] border-accent pl-8 md:pl-12">
              <p className="text-[1.5rem] font-bold leading-[1.25] tracking-[-0.02em] text-graphite md:text-[2rem] md:leading-[1.3]">
                {block.text}
              </p>
              <footer className="mt-8 flex flex-col gap-1">
                <cite className="text-base font-bold not-italic text-graphite">
                  {block.attribution}
                </cite>
                <p className="text-sm leading-5 text-slate">{block.role}</p>
              </footer>
            </blockquote>
          </CaseStudyReveal>
        </Container>
      );
  }
}
