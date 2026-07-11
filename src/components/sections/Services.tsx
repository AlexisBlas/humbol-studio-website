import { services } from "@/data/services";
import { SectionRow } from "@/components/ui/SectionRow";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <SectionRow id="services" label="What we do">
      <div className="flex flex-col gap-4">
        <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
          Research-grounded.
          <br />
          Ship-ready.
        </h2>
        <p className="max-w-[815px] text-[19px] leading-[1.5] text-iron">
          Every engagement starts with understanding. Every deliverable is
          designed to be built, not just presented.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionRow>
  );
}
