import SecondaryFeatures from '@/components/SecondaryFeatures'
import CriticalFeatures from '@/components/ui/CriticalFeatures'
import HeroBanner from '@/components/ui/HeroBanner'
import ResumeBanner from '@/components/ui/ResumeBanner'
import StepsDescription from '@/components/ui/StepsDescription'
import React from 'react'

function page() {
  return (
    <>
    <HeroBanner/>
    <CriticalFeatures/>
    <SecondaryFeatures/>
    <StepsDescription/>
    <ResumeBanner/>
    </>
  )
}

export default page
