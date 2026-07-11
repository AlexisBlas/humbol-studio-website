"use client";

import { HeroWebGL } from "@/components/sections/HeroWebGL";
import { HeroMeshBackground } from "@/components/sections/HeroMeshBackground";
import Image from "next/image";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/ArrowRight";
import type { CSSProperties } from "react";

const overshoot = [0.45, 1.45, 0.8, 1] as const;

type Letter = {
  src: string;
  style: CSSProperties;
};

/* Positions from the Figma "humbol" lockup (percentages of a 1376x402 box). */
const letters: Letter[] = [
  { src: "/hero/letter-h.svg", style: { left: "0%", right: "85.14%", top: "0%", height: "100%" } },
  { src: "/hero/letter-u.svg", style: { left: "17.14%", right: "68.21%", top: "16.05%", height: "86.17%" } },
  { src: "/hero/letter-m.svg", style: { left: "34.18%", right: "42.36%", top: "15.06%", height: "86.17%" } },
  { src: "/hero/letter-b.svg", style: { left: "60.05%", right: "25.15%", top: "0%", height: "100%" } },
  { src: "/hero/letter-o.svg", style: { left: "76.86%", right: "8.25%", top: "15.06%", height: "87.08%" } },
  { src: "/hero/letter-l.svg", style: { left: "93.96%", right: "0%", top: "0%", height: "100%" } },
];

function HeroLetter({
  letter,
  index,
  exitProgress,
}: {
  letter: Letter;
  index: number;
  exitProgress: MotionValue<number>;
}) {
  const [introDone, setIntroDone] = useState(false);
  const letterOpacity = 0.45;

  /* Reverse stagger: last letter exits first, matching intro played backward. */
  const reverseIndex = letters.length - 1 - index;
  const exitStart = reverseIndex * 0.055;
  const exitEnd = Math.min(exitStart + 0.42, 1);

  const letterExit = useTransform(exitProgress, [exitStart, exitEnd], [0, 1]);
  const scrollY = useTransform(letterExit, [0, 1], [0, 90]);
  const scrollScale = useTransform(letterExit, [0, 1], [1, 0.85]);
  const scrollOpacity = useTransform(letterExit, [0, 1], [letterOpacity, 0]);

  return (
    <motion.div
      className="absolute"
      style={
        introDone
          ? { ...letter.style, y: scrollY, scale: scrollScale, opacity: scrollOpacity }
          : letter.style
      }
      initial={{ opacity: 0, scale: 0.85, y: 90 }}
      animate={introDone ? false : { opacity: letterOpacity, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: overshoot,
        opacity: { duration: 0.3, delay: index * 0.12, ease: "easeOut" },
      }}
      onAnimationComplete={() => setIntroDone(true)}
    >
      <Image
        src={letter.src}
        alt=""
        fill
        className="object-contain brightness-0 invert"
      />
    </motion.div>
  );
}

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  /* Progress 0→1 across the pinned scrub (1 viewport of scroll). */
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, 40]);

  return (
    <MotionConfig reducedMotion="user">
      {/* 100vh sticky panel + 100vh scrub distance while pinned */}
      <div ref={pinRef} id="hero-pin" className="relative h-[200vh]">
        <section className="sticky top-0 isolate flex h-svh w-full flex-col overflow-hidden rounded-b-[32px]">
          <HeroMeshBackground />
          <HeroWebGL />
          {/* Soft fade into the page background / About */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28%] bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary"
          />
          <h1 className="sr-only">
            humbol — we design what people remember. We build what teams depend
            on.
          </h1>
          <div
            className="absolute inset-0 z-10 flex items-center px-margin-mobile md:px-stack-lg"
            aria-hidden="true"
          >
            <div className="relative w-full aspect-[1376/402]">
              {letters.map((letter, i) => (
                <HeroLetter
                  key={letter.src}
                  letter={letter}
                  index={i}
                  exitProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-8 px-margin-mobile pb-12 md:flex-row md:items-end md:justify-between md:px-stack-lg"
            style={{ opacity: copyOpacity, y: copyY }}
          >
            <div className="flex flex-col gap-6 md:gap-8">
              <motion.div
                className="h-[6px] rounded-full bg-iron/60 mix-blend-plus-lighter"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 117, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9, ease: "easeInOut" }}
              />
              <motion.p
                className="text-lg font-bold leading-[1.2] tracking-[-0.01em] text-iron md:text-[23px]"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 1.05, ease: "easeOut" }}
              >
                We design what people remember.
                <br />
                We build what teams depend on.
              </motion.p>
            </div>
            <motion.a
              href="#services"
              className="group flex items-center gap-3 text-base font-bold text-iron"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 1.15, ease: "easeOut" }}
            >
              See what we do
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
}
