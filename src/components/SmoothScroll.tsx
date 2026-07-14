"use client";

import { useEffect } from "react";
import {
  bindSmoothScrollHistory,
  bindSmoothScrollInterrupt,
  handleSmoothNavClick,
} from "@/lib/smooth-scroll";

/** Global eased scrolling for in-page nav links and the home logo. */
export function SmoothScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      handleSmoothNavClick(event);
    };

    document.addEventListener("click", onClick, true);
    const unbindInterrupt = bindSmoothScrollInterrupt();
    const unbindHistory = bindSmoothScrollHistory();

    return () => {
      document.removeEventListener("click", onClick, true);
      unbindInterrupt();
      unbindHistory();
    };
  }, []);

  return null;
}
