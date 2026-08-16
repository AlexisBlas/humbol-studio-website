import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type SectionRowProps = {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

/** Editorial two-column layout: label rail on the left, content on the right. */
export function SectionRow({ id, label, children, className }: SectionRowProps) {
  return (
    <section
      id={id}
      className={cn("w-full scroll-mt-16", className)}
    >
      <Container className="grid grid-cols-1 gap-gutter pb-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="flex flex-col gap-10 md:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

type SectionIntroProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Headline on the left, supporting copy on the right, tops aligned. */
export function SectionIntro({ title, children, className }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-x-16",
        className,
      )}
    >
      <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:col-span-4 md:text-[33px]">
        {title}
      </h2>
      <div className="md:col-span-8">{children}</div>
    </div>
  );
}
