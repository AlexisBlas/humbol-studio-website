"use client";

import { useEffect, useState } from "react";

/** True when hover is a real pointer, not a sticky touch :hover. */
export function useFineHover() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return enabled;
}

/** Interruptible, no-bounce spring — stays on the compositor. */
export const hoverSpring = {
  type: "spring",
  duration: 0.5,
  bounce: 0,
} as const;
