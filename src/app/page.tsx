import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Concepts } from "@/components/sections/Concepts";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Concepts />
        <Brands />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
