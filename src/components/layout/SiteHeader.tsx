"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled || open
          ? "bg-white shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)]"
          : "bg-transparent",
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-margin-mobile md:px-stack-lg">
        <a href="/" aria-label="humbol — home" onClick={close}>
          <Logo priority />
        </a>

        {/* Desktop pill */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex h-12 items-center gap-8 rounded-full bg-indigo-deep px-6 py-2 backdrop-blur-[2px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-base font-bold text-bg-primary transition-opacity hover:opacity-80"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="relative flex size-12 items-center justify-center rounded-full bg-indigo-deep md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 rounded-full bg-bg-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-bg-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 rounded-full bg-bg-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-x-0 top-full border-t border-stone bg-white shadow-[0px_8px_24px_rgba(28,25,23,0.08)] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="px-margin-mobile py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 + i * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      className="block rounded-2xl px-4 py-3.5 text-lg font-bold text-graphite transition-colors hover:bg-bg-primary"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                onClick={close}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
                className="mt-4 flex h-12 items-center justify-center rounded-full bg-interactive text-base font-bold text-bg-primary transition-colors hover:bg-interactive-hover"
              >
                Start a conversation
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
