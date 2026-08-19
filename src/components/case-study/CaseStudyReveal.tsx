"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CaseStudyRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function CaseStudyReveal({
  children,
  className,
  delay = 0,
}: CaseStudyRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
