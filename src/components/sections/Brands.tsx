import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

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

export function Brands() {
  return (
    <section id="brands" className="w-full scroll-mt-16 pb-24 md:pb-32">
      <Container>
        <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-4 text-center">
          <SectionLabel>Clients & brands</SectionLabel>
          <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
            Brands we&apos;ve helped shape — through studios, agencies, and
            direct partnerships.
          </h2>
        </div>

        <ul
          aria-label="Clients and brands"
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:mt-20 md:gap-x-10 md:gap-y-14 lg:grid-cols-5"
        >
          {brands.map((brand) => (
            <li
              key={brand.name}
              className="group flex min-h-11 items-center justify-center"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={160}
                height={48}
                className="h-6 w-auto max-w-[7.5rem] object-contain opacity-80 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-8 md:max-w-[8.5rem] [@media(hover:hover)_and_(pointer:fine)]:opacity-[0.62] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
              />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 text-center text-xs leading-5 text-slate md:mt-16 md:whitespace-nowrap">
          Logos are trademarks of their respective owners and are displayed
          solely to identify products and organizations I&apos;ve contributed
          to.
        </p>
      </Container>
    </section>
  );
}
