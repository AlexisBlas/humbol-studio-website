import Image from "next/image";
import type { CaseStudyMedia } from "@/data/case-studies";
import { cn } from "@/lib/utils";

type CaseStudyImageProps = CaseStudyMedia & {
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
};

export function CaseStudyImage({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1380px",
  className,
  rounded = true,
}: CaseStudyImageProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-stone",
          rounded && "rounded-3xl",
        )}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={src.startsWith("https://placehold.co")}
          draggable={false}
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-[65ch] text-sm leading-6 text-slate">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
