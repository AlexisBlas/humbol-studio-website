"use client";

import { useRef } from "react";
import type { CaseStudyMedia } from "@/data/case-studies";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { cn } from "@/lib/utils";

type CaseStudyGalleryProps = {
  images: CaseStudyMedia[];
};

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    pointerId: null as number | null,
    startX: 0,
    scrollLeft: 0,
  });

  return (
    <div className="relative">
      <p className="mb-6 px-margin-mobile text-label-caps font-bold uppercase tracking-[0.08em] text-slate md:px-stack-lg">
        Drag
      </p>
      <div
        ref={scrollerRef}
        tabIndex={0}
        aria-label="Project gallery"
        className={cn(
          "flex cursor-grab gap-4 overflow-x-auto px-margin-mobile pb-2 select-none md:gap-6 md:px-stack-lg",
          "snap-x snap-mandatory scroll-pl-margin-mobile md:scroll-pl-stack-lg",
          "active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          const node = scrollerRef.current;
          if (!node) return;
          drag.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            scrollLeft: node.scrollLeft,
          };
          node.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const node = scrollerRef.current;
          if (!node || drag.current.pointerId !== event.pointerId) return;
          const delta = event.clientX - drag.current.startX;
          node.scrollLeft = drag.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => {
          const node = scrollerRef.current;
          if (drag.current.pointerId !== event.pointerId) return;
          if (node?.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId);
          }
          drag.current.pointerId = null;
        }}
        onPointerCancel={(event) => {
          const node = scrollerRef.current;
          if (drag.current.pointerId !== event.pointerId) return;
          if (node?.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId);
          }
          drag.current.pointerId = null;
        }}
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="w-[min(78vw,420px)] shrink-0 snap-start md:w-[min(52vw,560px)]"
          >
            <CaseStudyImage
              {...image}
              sizes="(max-width: 768px) 78vw, 560px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
