import Image from "next/image";
import type { Service, ServiceTone } from "@/data/services";
import { ServiceCrystal } from "@/components/ui/ServiceCrystal";
import { cn } from "@/lib/utils";

const tones: Record<ServiceTone, { card: string; icon: string }> = {
  mist: {
    card: "bg-[#E8E4F8]",
    icon: "bg-white/75",
  },
  stone: {
    card: "bg-[#E6E8EC]",
    icon: "bg-white/80",
  },
  fog: {
    card: "bg-[#DDE3EC]",
    icon: "bg-white/80",
  },
  paper: {
    card: "bg-surface ring-1 ring-stone/80",
    icon: "bg-[#F3F1FC]",
  },
};

export function ServiceCard({ service }: { service: Service }) {
  const tone = tones[service.tone];

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[2rem] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_40px_-28px_rgba(26,28,32,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:min-h-[400px] md:p-7",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-2",
        tone.card,
      )}
    >
      <div className="relative z-[1] flex flex-col gap-6">
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl",
            tone.icon,
          )}
        >
          <Image
            src={service.icon}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[22px]">
            {service.title}
          </h3>
          <p className="max-w-[36ch] text-body-md leading-6 text-iron">
            {service.description}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-auto flex h-[120px] items-end justify-end pt-6 md:h-[140px] md:pt-8"
      >
        <div className="size-[140px] translate-x-3 translate-y-5 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:size-[160px] md:translate-x-4 md:translate-y-6 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-3">
          <ServiceCrystal tone={service.tone} />
        </div>
      </div>
    </article>
  );
}
