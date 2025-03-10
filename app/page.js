import Link from "next/link";
// import ButtonSignin from "@/components/ButtonSignin";
import { HeroSection } from "@/components/ui/hero-section-dark";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Footer from "@/components/Footer";
// import BetterIcon from "@/components/BetterIcon";
// import ButtonAccount from "@/components/ButtonAccount";
// import ButtonCheckout from "@/components/ButtonCheckout";
// import ButtonGradient from "@/components/ButtonGradient";
// import ButtonLead from "@/components/ButtonLead";
// import ButtonSupport from "@/components/ButtonSupport";
// import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
// import FeaturesListicle from "@/components/FeaturesListicle";
import Header from "@/components/Header";
// import Modal from "@/components/Modal";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
// import Testimonial from "@/components/Testimonials1";
//import Testimonials11 from "@/components/Testimonials11";
// import Testimonial1Small from "@/components/Testimonial1Small";
// import Testimonials3 from "@/components/Testimonials3";
// import TestimonialsAvatars from "@/components/TestimonialsAvatars";
import WithWithout from "@/components/WithWithout";
import Hero from "@/components/Hero";
import OtherTools from "@/components/OtherTools";
import CTA from "@/components/CTA";
import ButtonLead from "@/components/ButtonLead";
export default function Page() {
  return (
    <>
      {/* <header className="p-4 flex justify-end max-w-7xl mx-auto">
        <ButtonSignin text="Login" />
      </header> */}
      <Header />
      <main>
        <Hero />
        <Problem />
        <OtherTools />
        {/* <ButtonAccount /> */}
        <FeaturesAccordion />
        {/* <BetterIcon /> */}
        {/* <ButtonCheckout /> */}
        {/* <ButtonGradient /> */}
        
        {/* <ButtonSupport /> */}
        {/* <CTA /> */}
        {/* <FeaturesListicle /> */}
        {/* <Problem /> */}
        <Pricing />
        {/* <Testimonials11 /> */}
        {/* <Testimonial /> */}
        
        {/* <Testimonial1Small /> */}
        {/* <Testimonials3 /> */}
        {/* <TestimonialsAvatars /> */}
        
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
