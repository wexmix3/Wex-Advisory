import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import SampleReport from "@/components/SampleReport";
import CaseStudy from "@/components/CaseStudy";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <SampleReport />
        <CaseStudy />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
