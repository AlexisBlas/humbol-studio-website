"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { hoverSpring, useFineHover } from "@/lib/use-fine-hover";

const revealEase = [0.22, 1, 0.36, 1] as const;

const brands = [
  { name: "FirstBank", src: "/brands/first_bank.svg" },
  { name: "WAPA.tv", src: "/brands/wapa.svg" },
  { name: "PlayStation", src: "/brands/playstation.svg" },
  { name: "Firefox", src: "/brands/firefox.svg" },
  { name: "Resume Help", src: "/brands/resume_help.svg" },
  { name: "Resume Genius", src: "/brands/resume_genius.svg" },
  { name: "Resume Nerd", src: "/brands/resume_nerd.svg" },
  { name: "College Board", src: "/brands/college_board.svg" },
  { name: "Columbia Central University", src: "/brands/columbia_central_university.svg" },
  { name: "Inbify", src: "/brands/inbify.svg" },
  { name: "Hyp3r", src: "/brands/hyp3r.svg" },
  { name: "AI Squared", src: "/brands/aisquared.svg" },
  { name: "Watchdog", src: "/brands/watchdog.svg" },
  { name: "UVA", src: "/brands/uva.svg" },
  { name: "Caribbean Cinemas", src: "/brands/caribbean_cinemas.svg" },
] as const;

function BrandLogo({
  name,
  src,
  canHover,
}: {
  name: string;
  src: string;
  canHover: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const live = Boolean(canHover && !reduceMotion && hovered);

  return (
    <motion.div
      className="flex min-h-11 w-full items-center justify-center"
      onHoverStart={() => {
        if (canHover) setHovered(true);
      }}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: live ? 1.06 : 1,
        opacity: live ? 1 : canHover ? 0.55 : 0.8,
      }}
      transition={hoverSpring}
    >
      <Image
        src={src}
        alt={name}
        width={160}
        height={48}
        className="pointer-events-none h-6 w-auto max-w-[7.5rem] object-contain grayscale md:h-8 md:max-w-[8.5rem]"
      />
    </motion.div>
  );
}

export function Brands() {
  const canHover = useFineHover();
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section id="brands" className="w-full scroll-mt-16 py-20 md:py-24">
        <Container>
          <motion.div
            className="rounded-[2rem] bg-surface px-8 py-16 shadow-[0_1px_2px_rgba(26,28,32,0.04),0_20px_48px_-16px_rgba(26,28,32,0.1)] md:px-12 md:py-20"
            initial={reduceMotion ? false : { opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -12% 0px" }}
            transition={{
              duration: 1.25,
              ease: revealEase,
            }}
          >
            <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-4 text-center">
              <SectionLabel>Clients & brands</SectionLabel>
              <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
                Brands we&apos;ve helped shape — through studios, agencies, and
                direct partnerships.
              </h2>
            </div>

            <ul
              aria-label="Clients and brands"
              className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:mt-20 md:gap-x-10 lg:grid-cols-5"
            >
              {brands.map((brand) => (
                <li key={brand.name}>
                  <BrandLogo name={brand.name} src={brand.src} canHover={canHover} />
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-12 text-center text-xs leading-5 text-slate md:mt-16 md:whitespace-nowrap">
              Logos are trademarks of their respective owners and are displayed
              solely to identify products and organizations I&apos;ve contributed
              to.
            </p>
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
