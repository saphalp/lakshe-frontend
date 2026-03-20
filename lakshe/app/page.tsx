import SecondaryFeatures from '@/components/SecondaryFeatures'
import CriticalFeatures from '@/components/ui/CriticalFeatures'
import Footer from '@/components/ui/Footer'
import HeroBanner from '@/components/ui/HeroBanner'
import ResumeBanner from '@/components/ui/ResumeBanner'
import StepsDescription from '@/components/ui/StepsDescription'
import CallToActionCard from '@/components/ui/CallToActionCard'
import React from 'react'

function page() {
  return (
    <>
    <HeroBanner/>
    <CriticalFeatures/>
    <SecondaryFeatures/>
    <StepsDescription/>
    <ResumeBanner/>
    <CallToActionCard/>
    <Footer/>
    </>
  )
}

export default page
