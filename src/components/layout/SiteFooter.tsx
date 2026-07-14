import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/humbol.studio",
    icon: InstagramIcon,
  },
  {
    label: "X",
    href: null as string | null,
    icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: null as string | null,
    icon: LinkedInIcon,
  },
] as const;

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
      <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between gap-8 px-margin-mobile py-12 md:px-10">
        <div className="flex flex-col gap-2">
          <Logo className="h-6" />
          <p className="text-sm leading-5 text-iron">Shape that matters.</p>
          <p className="text-xs leading-5 text-iron-slate">
            hello@humbol.studio
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <ul className="flex items-center gap-3" aria-label="Social media">
            {socials.map((social) => {
              const Icon = social.icon;
              const className = cn(
                "flex size-9 items-center justify-center rounded-full text-iron transition-colors",
                social.href
                  ? "hover:bg-bg-primary hover:text-graphite"
                  : "cursor-default opacity-35",
              );

              if (!social.href) {
                return (
                  <li key={social.label}>
                    <span
                      className={className}
                      title={`${social.label} — coming soon`}
                      aria-label={`${social.label} (coming soon)`}
                    >
                      <Icon className="size-4" />
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
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col items-end gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] leading-5 text-iron transition-colors hover:text-graphite"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
