import { SectionRow } from "@/components/ui/SectionRow";

export function About() {
  return (
    <SectionRow id="about" label="About" className="pt-20">
      <div className="flex flex-col gap-4">
        <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
          Humble in approach.
          <br />
          Bold in execution.
        </h2>
      </div>
      <div className="flex max-w-[672px] flex-col gap-4 text-body-md leading-6 text-iron">
        <p>
          Twenty years of intentional design — across studios, agencies, and
          direct partnerships.
        </p>
        <p>
          humbol is a solo studio built on a simple tension: go deep before you
          conclude, then commit to a clear position. We work at the
          intersection of research, systems thinking, and craft — for founders
          and organizations where design can actually make a difference.
        </p>
        <p>
          From SaaS products and consumer experiences to design systems for
          teams of every size — every engagement starts with understanding, and
          every deliverable is built to hold up after launch.
        </p>
      </div>
    </SectionRow>
  );
}
