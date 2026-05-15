import SecondaryFeatures from "@/components/landing/SecondaryFeatures";
import CriticalFeatures from "@/components/landing/CriticalFeatures";
import HeroBanner from "@/components/landing/HeroBanner";
import ResumeBanner from "@/components/landing/ResumeBanner";
import FAQ from "@/components/landing/FAQ";
import StepsDescription from "@/components/landing/StepsDescription";
import CallToActionCard from "@/components/landing/CallToActionCard";
import React from "react";
import PricingSection from "@/components/landing/PricingSection";
import { StepProvider } from "@/context/StepContext";
import Navbar from "@/components/landing/Navbar";

export default function Page() {
  return (
    <>
      {/* Navbar floats above the full-screen cinematic hero */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>

      {/* Cinematic hero is full-screen — GSAP pins it for scroll animation */}
      <HeroBanner />

      {/* The rest of the landing page follows after the pinned hero */}
      <CriticalFeatures />
      <SecondaryFeatures />
      <StepProvider>
        <StepsDescription />
      </StepProvider>
      <ResumeBanner />
      <PricingSection />
      <FAQ />
      <CallToActionCard />
    </>
  );
}
