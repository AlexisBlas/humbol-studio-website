"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";

const STAGGER_CLASS = ["", "md:mt-9", "md:mt-2.5", "md:mt-12"];

/** Outer cards travel farther so the set reads as opening from the middle. */
const GATHER_X = [120, 40, -40, -120];
const CENTER_OUT_DELAY = [0.1, 0, 0, 0.1];

const enterSpring = {
  type: "spring",
  duration: 0.58,
  bounce: 0,
} as const;

export function ServicesField() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="pb-8 md:pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {services.map((service, index) => (
            <DealCard
              key={service.id}
              index={index}
              className={STAGGER_CLASS[index]}
            >
              <ServiceCard service={service} />
            </DealCard>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

function DealCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const wide = useMinWidth(1280);
  const shown = Boolean(reduceMotion) || inView;

  return (
    <motion.div
      ref={ref}
      className={cn("h-full", className)}
      initial={{ opacity: 0, y: 28, scale: 0.96, x: 0 }}
      animate={{
        opacity: shown ? 1 : 0,
        y: shown ? 0 : 28,
        scale: shown ? 1 : 0.96,
        x: shown || !wide ? 0 : GATHER_X[index] ?? 0,
      }}
      transition={{
        ...enterSpring,
        delay: shown && !reduceMotion ? CENTER_OUT_DELAY[index] : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [px]);

  return matches;
}
