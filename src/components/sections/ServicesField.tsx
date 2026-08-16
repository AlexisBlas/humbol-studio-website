"use client";

import { MotionConfig, motion } from "motion/react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";

const STAGGER_CLASS = ["", "md:mt-9", "md:mt-2.5", "md:mt-12"];

export function ServicesField() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="pb-8 md:pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {services.map((service, index) => (
            <WaveCard
              key={service.id}
              index={index}
              className={STAGGER_CLASS[index]}
            >
              <ServiceCard service={service} />
            </WaveCard>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

function WaveCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
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
