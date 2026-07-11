"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-white shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)]"
          : "bg-transparent",
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-margin-mobile md:px-stack-lg">
        <a href="#" aria-label="humbol — home">
          <Logo priority />
        </a>
        <nav aria-label="Main navigation">
          <ul className="flex h-12 items-center gap-6 rounded-full bg-indigo-deep px-6 py-2 backdrop-blur-[2px] md:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-bold text-bg-primary transition-opacity hover:opacity-80 md:text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
