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
