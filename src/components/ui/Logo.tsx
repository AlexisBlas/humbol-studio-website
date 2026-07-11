import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "inverse";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "default",
  className,
  priority = false,
}: LogoProps) {
  const src = variant === "inverse" ? "/logo-inverse.svg" : "/logo.svg";

  return (
    <Image
      src={src}
      alt="humbol"
      width={178}
      height={47}
      priority={priority}
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );
}
