import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/humbol.studio",
    icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://www.youtube.com/watch?v=QDia3e12czc",
    icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.youtube.com/watch?v=QDia3e12czc",
    icon: LinkedInIcon,
  },
] as const;

const linkTransition =
  "transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 5.5 10.8 12.2 5.2 18.5H7l4.4-5 3.6 5H19L12.9 11.5 18.2 5.5H16.4l-4 4.6L9 5.5H5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H4.25V19h2.69V8.5ZM5.6 7.3a1.56 1.56 0 1 0 0-3.12 1.56 1.56 0 0 0 0 3.12ZM19.75 19h-2.69v-5.4c0-1.54-.55-2.59-1.93-2.59-1.05 0-1.68.71-1.95 1.4-.1.24-.13.58-.13.91V19H10.4s.04-9.55 0-10.5h2.65v1.49c.35-.54 1.25-1.66 3.1-1.66 2.26 0 3.6 1.48 3.6 4.66V19Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex max-w-sm flex-col gap-3">
            <a href="/" aria-label="humbol — home" className="w-fit">
              <Logo className="h-6" />
            </a>
            <p className="text-body-md leading-6 text-iron">
              Shape that matters.
            </p>
            <a
              href="mailto:hello@humbol.studio"
              className={cn(
                "w-fit text-base font-bold text-interactive underline decoration-interactive/30 underline-offset-2",
                linkTransition,
                "hover:text-interactive-hover hover:decoration-interactive-hover",
              )}
            >
              hello@humbol.studio
            </a>
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-end">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "inline-flex min-h-11 cursor-pointer items-center text-base font-bold text-iron sm:px-3",
                        linkTransition,
                        "hover:text-interactive",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center gap-2" aria-label="Social media">
              {socials.map((social) => {
                const Icon = social.icon;
                const className = cn(
                  "flex size-11 items-center justify-center rounded-full text-iron",
                  linkTransition,
                  social.href
                    ? "cursor-pointer hover:bg-bg-primary hover:text-interactive"
                    : "cursor-default opacity-[0.38]",
                );

                if (!social.href) {
                  return (
                    <li key={social.label}>
                      <span
                        className={className}
                        title={`${social.label} — coming soon`}
                        aria-label={`${social.label} (coming soon)`}
                      >
                        <Icon className="size-5" />
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={className}
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-stone pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-5 text-slate">© 2026 humbol</p>
          <p className="text-sm leading-5 text-slate">San Juan, Puerto Rico</p>
        </div>
      </Container>
    </footer>
  );
}
