import React from 'react'
import { Button } from '../ui/button'


function HeroBanner() {
  return (
    <div className='flex flex-col justify-center items-center gap-7 font-sans min-h-[500px] mt-10 py-10 px-4'>
        <div className='flex flex-col items-center text-5xl md:text-6xl lg:text-7xl gap-2 font-extrabold text-center'>
        <p className='text-white'>Land your dream job - </p>
        <p className='bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent'> faster than ever. </p>
        </div>
        <p className='text-lg text-[oklch(55.4%_0.046_257.417)] text-center w-full max-w-2xl px-4'>Accelerate your career with AI-powered resume building, interview
        prep, and personalized job matching that skips the noise and gets
        results.</p>
        <div className='flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4 sm:px-0 mt-4'>
            <Button variant={'default'} size={'lg'} className="w-full sm:w-auto">Get Started</Button>
            <Button variant={'outline'} size={'lg'} className="w-full sm:w-auto">Watch Demo</Button>
        </div>
    </div>
  )
}

export default HeroBanner
