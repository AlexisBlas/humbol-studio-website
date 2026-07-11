import { SectionRow } from "@/components/ui/SectionRow";

export function Contact() {
  return (
    <SectionRow
      id="contact"
      label="Let's work together"
      className="border-t border-stone pt-20"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-[28px] font-bold leading-10 tracking-[-0.01em] text-graphite md:text-[32px]">
          Have a product that needs shaping?
        </h2>
        <p className="text-headline-md font-bold leading-8 text-slate">
          Let&apos;s find out if we&apos;re a fit.
        </p>
        <p className="max-w-[672px] pt-2 text-body-md leading-6 text-slate">
          I take on a small number of projects at a time — so every engagement
          gets real focus. If you&apos;re building something you believe in,
          I&apos;d like to hear about it.
        </p>
        <div className="pt-6">
          <a
            href="mailto:hello@humbol.studio"
            className="inline-flex items-center justify-center rounded-2xl bg-interactive px-6 py-3.5 text-base font-bold text-bg-primary transition-colors hover:bg-interactive-hover active:bg-interactive-pressed"
          >
            Start a conversation
          </a>
        </div>
        <p className="pt-2 text-label-caps font-medium text-slate">
          hello@humbol.studio · San Juan, Puerto Rico
        </p>
      </div>
    </SectionRow>
  );
}
