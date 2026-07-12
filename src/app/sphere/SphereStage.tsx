"use client";

import { HeroMeshBackground } from "@/components/sections/HeroMeshBackground";
import {
  HeroWebGL,
  preloadHeroThree,
} from "@/components/sections/HeroWebGL";
import { useEffect } from "react";

/**
 * Full-bleed sphere + mesh only — for social recording / stills.
 * Visit /sphere (no nav, no copy).
 */
export function SphereStage() {
  useEffect(() => {
    preloadHeroThree();
  }, []);

  return (
    <main className="relative h-svh w-full overflow-hidden bg-[#f4fbf9]">
      <HeroMeshBackground />
      <HeroWebGL />
    </main>
  );
}
