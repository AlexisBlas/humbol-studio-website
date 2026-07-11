import { Logo } from "@/components/ui/Logo";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between px-margin-mobile py-12 md:px-10">
        <div className="flex flex-col gap-2">
          <Logo className="h-6" />
          <p className="text-sm leading-5 text-iron">Shape that matters.</p>
          <p className="text-xs leading-5 text-iron-slate">
            hello@humbol.studio
          </p>
        </div>
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
    </footer>
  );
}
