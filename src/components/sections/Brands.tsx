import Image from "next/image";
import { SectionRow } from "@/components/ui/SectionRow";

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
    <SectionRow id="brands" label="Clients & brands">
      <h2 className="max-w-[910px] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
        Brands we&apos;ve helped shape — through studios, agencies, and direct
        partnerships.
      </h2>
      <div className="flex flex-col gap-3">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-stone shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)] md:grid-cols-5">
          {brands.map((brand) => (
            <li
              key={brand.name}
              className="group flex h-[92px] items-center justify-center bg-surface px-5"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={140}
                height={40}
                className="h-5 w-auto max-w-[88%] object-contain opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-6"
              />
            </li>
          ))}
        </ul>
        <p className="text-[11px] leading-4 text-steel md:whitespace-nowrap">
          Logos are trademarks of their respective owners and are displayed
          solely to identify products and organizations I&apos;ve contributed
          to.
        </p>
      </div>
    </SectionRow>
  );
}
