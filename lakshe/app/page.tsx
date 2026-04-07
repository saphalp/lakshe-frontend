import SecondaryFeatures from '@/components/landing/SecondaryFeatures'
import CriticalFeatures from '@/components/landing/CriticalFeatures'
import Footer from '@/components/shared/Footer'
import HeroBanner from '@/components/landing/HeroBanner'
import ResumeBanner from '@/components/landing/ResumeBanner'
import FAQ from '@/components/landing/FAQ'
import StepsDescription from '@/components/landing/StepsDescription'
import CallToActionCard from '@/components/landing/CallToActionCard'
import React from 'react'
import PricingSection from '@/components/landing/PricingSection'
import { StepProvider } from "@/context/StepContext"
import Navbar from '@/components/landing/Navbar'


function page() {
  return (
    <>
    <Navbar/>
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
    </>
  )
}

export default page
