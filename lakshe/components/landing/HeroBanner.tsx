"use client";

import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function HeroBanner() {
  return (
    <CinematicHero
      brandName="Lakshe"
      tagline1="Land your dream job —"
      tagline2="faster than ever."
      cardHeading="Your AI career engine."
      cardDescription={
        <>
          <span className="text-white font-semibold">Lakshe</span> scrapes
          jobs from LinkedIn, Indeed, and Glassdoor — then generates tailored,
          ATS-beating resumes and tracks every application in one workspace.
        </>
      }
      metricValue={50}
      metricLabel="Jobs Matched"
      ctaHeading="Start landing interviews."
      ctaDescription="Join job seekers using Lakshe to apply smarter, track better, and land faster. Free plan — no card required."
    />
  );
}
