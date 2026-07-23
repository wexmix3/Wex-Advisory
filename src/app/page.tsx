import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AuditSpotlight from "@/components/AuditSpotlight";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import SampleReport from "@/components/SampleReport";
import CaseStudy from "@/components/CaseStudy";
import AboutFounder from "@/components/AboutFounder";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <Hero />
        <ScrollReveal><AuditSpotlight /></ScrollReveal>
        <ScrollReveal><WhatWeDo /></ScrollReveal>
        <ScrollReveal><HowItWorks /></ScrollReveal>
        <ScrollReveal><SampleReport /></ScrollReveal>
        <ScrollReveal><CaseStudy /></ScrollReveal>
        <ScrollReveal><Pricing /></ScrollReveal>
        <ScrollReveal><AboutFounder /></ScrollReveal>
        <ScrollReveal><FAQ /></ScrollReveal>
        <ScrollReveal><ContactForm /></ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
