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
        <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-4 text-center">
          <SectionLabel>Clients & brands</SectionLabel>
          <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
            Brands we&apos;ve helped shape — through studios, agencies, and
            direct partnerships.
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-3 md:mt-16">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-stone shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)] md:grid-cols-5">
            {brands.map((brand) => (
              <li
                key={brand.name}
                className="group flex h-[92px] items-center justify-center bg-surface px-5 md:h-[108px]"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={140}
                  height={40}
                  className="h-5 w-auto max-w-[88%] object-contain opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-7"
                />
              </li>
            ))}
          </ul>
          <p className="pt-2 text-center text-[11px] leading-4 text-steel">
            Logos are trademarks of their respective owners and are displayed
            solely to identify products and organizations I&apos;ve contributed
            to.
          </p>
        </div>
      </Container>
    </section>
  );
}
