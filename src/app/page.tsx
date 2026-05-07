import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import SampleReport from "@/components/SampleReport";
import CaseStudy from "@/components/CaseStudy";
import AboutFounder from "@/components/AboutFounder";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
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
        <AboutFounder />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
