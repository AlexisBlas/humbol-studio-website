import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const study = caseStudies[0];

export const metadata: Metadata = {
  title: study ? `${study.client} — humbol` : "Work — humbol",
  description: study?.summary,
};

export default function WorkPage() {
  if (!study) notFound();

  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <CaseStudyTemplate study={study} />
      </main>
      <SiteFooter />
    </>
  );
}
