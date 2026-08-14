import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
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
      <main className="flex-1 pt-28 pb-20 md:pt-32">
        <Container>
          <div className="mx-auto max-w-[640px]">
            <SectionLabel>Let&apos;s work together</SectionLabel>
            <h1 className="mt-4 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-graphite md:text-[40px]">
              Let&apos;s shape something together.
            </h1>
            <p className="mt-4 max-w-[38ch] text-[19px] leading-[1.5] text-iron">
              Tell us a little about your project. We read every message and
              reply within two business days.
            </p>
            <div className="mt-10">
              <InquiryForm />
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
