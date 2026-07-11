import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-interactive text-white hover:bg-interactive-hover active:bg-interactive-pressed",
  secondary:
    "border-[1.5px] border-interactive bg-transparent text-interactive hover:bg-interactive-tint/40",
  ghost: "bg-transparent text-graphite hover:text-interactive",
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-default px-[18px] py-[10px] text-sm font-bold transition-colors",
    variantStyles[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
