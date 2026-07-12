import Image from "next/image";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-surface p-6 shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)] md:p-10">
      <div className="flex items-center gap-4 pb-6">
        <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#4ADED7]/25 via-interactive-tint to-[#FA99DB]/30 ring-1 ring-interactive/10">
          <Image
            src={service.icon}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className="relative z-[1]"
          />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-label-caps font-bold uppercase text-interactive">
            {service.label}
          </p>
          <h3 className="text-headline-md font-bold leading-[1.2] text-graphite">
            {service.title}
          </h3>
        </div>
      </div>
      <p className="text-body-md leading-6 text-iron">{service.description}</p>
    </article>
  );
}
