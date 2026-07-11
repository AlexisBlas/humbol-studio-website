import { SectionRow } from "@/components/ui/SectionRow";

const clients = [
  "FirstBank",
  "WAPA.tv",
  "PlayStation LATAM",
  "Resume Help",
  "Resume Genius",
  "Resume Nerd",
  "Pan Pepín",
  "Hyp3r",
  "Firefox",
  "Lexus Puerto Rico",
  "MicroJuris",
  "UVA",
  "Caribbean Cinemas",
];

export function Brands() {
  return (
    <SectionRow id="brands" label="Clients & brands">
      <h2 className="max-w-[910px] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
        Brands we&apos;ve helped shape — among many others — through
        studios, agencies, and direct partnerships.
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-5">
        {clients.map((client) => (
          <li
            key={client}
            className="flex h-[92px] items-center justify-center border border-stone px-4 text-center text-sm font-bold text-slate"
          >
            {client}
          </li>
        ))}
      </ul>
    </SectionRow>
  );
}
