import SecondaryFeatures from '@/components/ui/SecondaryFeatures'
import CriticalFeatures from '@/components/ui/CriticalFeatures'
import Footer from '@/components/ui/Footer'
import HeroBanner from '@/components/ui/HeroBanner'
import ResumeBanner from '@/components/ui/ResumeBanner'
import FAQ from '@/components/ui/FAQ'
import StepsDescription from '@/components/ui/StepsDescription'
import CallToActionCard from '@/components/ui/CallToActionCard'
import React from 'react'
import PricingSection from '@/components/ui/PricingSection'
import { StepProvider } from "@/context/StepContext"


function page() {
  return (
    <>
    <HeroBanner/>
    <CriticalFeatures/>
    <SecondaryFeatures/>
    <StepProvider>
    <StepsDescription/>
    </StepProvider>
    <ResumeBanner/>
    <PricingSection/>
    <FAQ/>
    <CallToActionCard/>
    <Footer/>
    </>
  )
}

export default page
