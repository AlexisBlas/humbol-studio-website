"use client";

import Script from "next/script";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL =
  "https://calendly.com/hello-humbol/30min?hide_event_type_details=1&hide_gdpr_banner=1&text_color=1a1c1c&primary_color=523ee7";

const CALENDLY_CSS =
  "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS =
  "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

type CalendlyButtonProps = {
  className?: string;
};

export function openCalendly() {
  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

export function CalendlyButton({ className }: CalendlyButtonProps) {
  useEffect(() => {
    if (document.querySelector(`link[href="${CALENDLY_CSS}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS;
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Script src={CALENDLY_JS} strategy="lazyOnload" />
      <button
        type="button"
        onClick={openCalendly}
        className={cn(
          "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-interactive bg-transparent px-6 py-3.5 text-base font-bold text-interactive transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-interactive-tint/40 active:bg-interactive-tint/60",
          className,
        )}
      >
        Schedule time with me
      </button>
    </>
  );
}
