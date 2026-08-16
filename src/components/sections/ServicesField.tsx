"use client";

import { motion, useReducedMotion } from "motion/react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";

const STAGGER_CLASS = ["", "md:mt-9", "md:mt-2.5", "md:mt-12"];

export function ServicesField() {
  const reduce = useReducedMotion();

  return (
    <div className="pb-8 md:pb-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {services.map((service, index) => (
          <WaveCard
            key={service.id}
            index={index}
            reduce={reduce}
            className={STAGGER_CLASS[index]}
          >
            <ServiceCard service={service} />
          </WaveCard>
        ))}
      </div>
    </div>
  );
}

function WaveCard({
  index,
  reduce,
  className,
  children,
}: {
  index: number;
  reduce: boolean | null;
  className?: string;
  children: React.ReactNode;
}) {
  if (reduce) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("h-full", className)}
      whileInView={{ y: [0, -22, 8, 0] }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 1.45,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.42, 0.7, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
