import Image from "next/image";
import { SectionRow } from "@/components/ui/SectionRow";

const brands = [
  { name: "FirstBank", src: "/brands/first_bank.svg" },
  { name: "WAPA.tv", src: "/brands/wapa.svg" },
  { name: "Resume Help", src: "/brands/resume_help.svg" },
  { name: "Resume Genius", src: "/brands/resume_genius.svg" },
  { name: "Resume Nerd", src: "/brands/resume_nerd.svg" },
  { name: "College Board", src: "/brands/college_board.svg" },
  { name: "Columbia Central University", src: "/brands/columbia_central_university.svg" },
  { name: "Inbify", src: "/brands/inbify.svg" },
  { name: "UVA", src: "/brands/uva.svg" },
  { name: "Caribbean Cinemas", src: "/brands/caribbean_cinemas.svg" },
] as const;

export function Brands() {
  return (
    <SectionRow id="brands" label="Clients & brands">
      <h2 className="max-w-[910px] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
        Brands we&apos;ve helped shape — among many others — through
        studios, agencies, and direct partnerships.
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-5">
        {brands.map((brand) => (
          <li
            key={brand.name}
            className="flex h-[92px] items-center justify-center border border-stone px-5"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={140}
              height={40}
              className="h-5 w-auto max-w-[88%] object-contain md:h-6"
            />
          </li>
        ))}
      </ul>
    </SectionRow>
  );
}
