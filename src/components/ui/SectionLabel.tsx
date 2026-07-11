import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
};

export function SectionLabel({
  children,
  className,
  inverse = false,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-label-caps font-bold uppercase tracking-[0.08em]",
        inverse ? "text-iron-text/70" : "text-slate",
        className,
      )}
    >
      {children}
    </p>
  );
}
