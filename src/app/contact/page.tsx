import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { CalendlyButton } from "@/components/ui/CalendlyButton";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Let's shape something together — humbol",
  description:
    "Tell us a little about your project. We read every message and reply within two business days.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1 pt-28 pb-20 md:pt-32 md:pb-24">
        <Container>
          <div className="mx-auto flex max-w-[640px] flex-col gap-12">
            <div className="flex flex-col gap-4">
              <SectionLabel>Let&apos;s work together</SectionLabel>
              <h1 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite md:text-[33px]">
                Let&apos;s shape something together.
              </h1>
              <p className="max-w-[40ch] text-[19px] leading-[1.5] text-iron">
                Tell us a little about your project. We read every message and
                reply within two business days.
              </p>
              <CalendlyButton className="mt-2 w-fit" />
            </div>
            <InquiryForm />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
