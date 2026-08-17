"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { Service, ServiceTone } from "@/data/services";
import { ServiceCrystal } from "@/components/ui/ServiceCrystal";
import { hoverSpring, useFineHover } from "@/lib/use-fine-hover";
import { cn } from "@/lib/utils";

const tones: Record<ServiceTone, { card: string; icon: string }> = {
  mist: {
    card: "bg-[#E8E4F8]",
    icon: "bg-white/75",
  },
  stone: {
    card: "bg-[#E6E8EC]",
    icon: "bg-white/80",
  },
  fog: {
    card: "bg-[#DDE3EC]",
    icon: "bg-white/80",
  },
  paper: {
    card: "bg-surface ring-1 ring-stone/80",
    icon: "bg-[#F3F1FC]",
  },
};

export function ServiceCard({ service }: { service: Service }) {
  const tone = tones[service.tone];
  const canHover = useFineHover();
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const live = Boolean(canHover && !reduceMotion && hovered);

  return (
    <motion.article
      className={cn(
        "relative h-full",
        "shadow-[0_16px_40px_-28px_rgba(26,28,32,0.18)]",
      )}
      onHoverStart={() => {
        if (canHover) setHovered(true);
      }}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: live ? -10 : 0 }}
      transition={hoverSpring}
    >
      <div
        className={cn(
          "group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[2rem] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:min-h-[400px] md:p-7",
          tone.card,
        )}
      >
        <div className="relative z-[1] flex flex-col gap-6">
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl",
              tone.icon,
            )}
          >
            <Image
              src={service.icon}
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
          </span>
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[22px]">
              {service.title}
            </h3>
            <p className="max-w-[36ch] text-body-md leading-6 text-iron">
              {service.description}
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative mt-auto flex h-[120px] items-end justify-end pt-6 md:h-[140px] md:pt-8"
        >
          <motion.div
            className="size-[140px] md:size-[160px]"
            animate={{
              x: live ? 6 : 16,
              y: live ? 12 : 24,
            }}
            transition={hoverSpring}
          >
            <ServiceCrystal tone={service.tone} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
