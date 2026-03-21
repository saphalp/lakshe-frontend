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

function page() {
  return (
    <>
    <HeroBanner/>
    <CriticalFeatures/>
    <SecondaryFeatures/>
    <StepsDescription/>
    <ResumeBanner/>
    <PricingSection/>
    <FAQ/>
    <CallToActionCard/>
    <Footer/>
    </>
  )
}

export default page
