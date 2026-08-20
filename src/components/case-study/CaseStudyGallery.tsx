"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "motion";
import { useReducedMotion } from "motion/react";
import type { CaseStudyMedia } from "@/data/case-studies";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { cn } from "@/lib/utils";

type CaseStudyGalleryProps = {
  images: CaseStudyMedia[];
};

const glideEase = [0.22, 1, 0.36, 1] as const;

function slideStep(node: HTMLElement) {
  const first = node.querySelector<HTMLElement>("[data-slide]");
  if (!first) return node.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(node).columnGap || getComputedStyle(node).gap) || 0;
  return first.offsetWidth + gap;
}

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const drag = useRef({
    pointerId: null as number | null,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const reduceMotion = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const stopAnim = () => {
    animRef.current?.stop();
    animRef.current = null;
  };

  const syncEdges = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = Math.max(0, node.scrollWidth - node.clientWidth);
    setAtStart(node.scrollLeft <= 2);
    setAtEnd(node.scrollLeft >= max - 2);
  }, []);

  const glideTo = useCallback(
    (target: number, duration = 0.7) => {
      const node = scrollerRef.current;
      if (!node) return;
      const max = Math.max(0, node.scrollWidth - node.clientWidth);
      const next = Math.max(0, Math.min(target, max));
      stopAnim();
      if (reduceMotion) {
        node.scrollLeft = next;
        syncEdges();
        return;
      }
      animRef.current = animate(node.scrollLeft, next, {
        duration,
        ease: glideEase,
        onUpdate: (value) => {
          node.scrollLeft = value;
        },
        onComplete: () => {
          animRef.current = null;
          syncEdges();
        },
      });
    },
    [reduceMotion, syncEdges],
  );

  const go = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const step = slideStep(node);
    const current = Math.round(node.scrollLeft / step) * step;
    glideTo(current + direction * step);
  };

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    syncEdges();
    const onScroll = () => syncEdges();
    node.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(() => syncEdges());
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", onScroll);
      observer.disconnect();
      stopAnim();
    };
  }, [images, syncEdges]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={0}
        aria-label="Project gallery"
        className={cn(
          "flex cursor-grab gap-4 overflow-x-auto px-margin-mobile pb-2 select-none md:gap-6 md:px-stack-lg",
          "scroll-pl-margin-mobile md:scroll-pl-stack-lg",
          "active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          const node = scrollerRef.current;
          if (!node) return;
          stopAnim();
          drag.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            scrollLeft: node.scrollLeft,
            moved: false,
          };
          node.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const node = scrollerRef.current;
          if (!node || drag.current.pointerId !== event.pointerId) return;
          const delta = event.clientX - drag.current.startX;
          if (Math.abs(delta) > 4) drag.current.moved = true;
          node.scrollLeft = drag.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => {
          const node = scrollerRef.current;
          if (drag.current.pointerId !== event.pointerId) return;
          if (node?.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId);
          }
          if (node && drag.current.moved) {
            const step = slideStep(node);
            const nearest = Math.round(node.scrollLeft / step) * step;
            glideTo(nearest, 0.55);
          }
          drag.current.pointerId = null;
          drag.current.moved = false;
        }}
        onPointerCancel={(event) => {
          const node = scrollerRef.current;
          if (drag.current.pointerId !== event.pointerId) return;
          if (node?.hasPointerCapture(event.pointerId)) {
            node.releasePointerCapture(event.pointerId);
          }
          drag.current.pointerId = null;
          drag.current.moved = false;
        }}
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            data-slide
            className="w-[min(78vw,420px)] shrink-0 md:w-[min(52vw,560px)]"
          >
            <CaseStudyImage
              {...image}
              sizes="(max-width: 768px) 78vw, 560px"
            />
          </div>
        ))}
      </div>

      <GalleryArrow
        direction="prev"
        disabled={atStart}
        onClick={() => go(-1)}
      />
      <GalleryArrow
        direction="next"
        disabled={atEnd}
        onClick={() => go(1)}
      />
    </div>
  );
}

function GalleryArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous images" : "Next images"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-graphite md:size-14",
        "shadow-[0_1px_2px_rgba(26,28,32,0.06),0_8px_24px_rgba(26,28,32,0.10)]",
        "transition-[opacity,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:shadow-[0_2px_8px_rgba(26,28,32,0.08),0_12px_28px_rgba(26,28,32,0.12)]",
        "active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-[0.38]",
        direction === "prev" ? "left-3 md:left-6" : "right-3 md:right-6",
      )}
    >
      <ArrowRight
        className={cn(
          "h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-6 md:w-6",
          direction === "prev" && "rotate-180",
        )}
      />
    </button>
  );
}
