import React from 'react'
import { Button } from './button'

function HeroBanner() {
  return (
    <div className='flex flex-col justify-center items-center gap-7 font-sans h-120 mt-10'>
        <div className='flex flex-col items-center text-7xl gap-2 font-extrabold'>
        <p className='text-white'>Land your dream job - </p>
        <p className='bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent'> faster than ever. </p>
        </div>
        <p className='text-lg text-[oklch(55.4%_0.046_257.417)] text-center w-200'>Accelerate your career with AI-powered resume building, interview
        prep, and personalized job matching that skips the noise and gets
        results.</p>
        <div className='flex gap-5'>
            {/* <button className="bg-emerald-400 w-40 h-12 text-white rounded-sm shadow-md shadow-emerald-300"> Get Started </button> */}
            <Button variant={'default'} size={'lg'}>Get Started</Button>
            <Button variant={'outline'} size={'lg'}>Watch Demo</Button>
        </div>
    </div>
  )
}

export default HeroBanner
