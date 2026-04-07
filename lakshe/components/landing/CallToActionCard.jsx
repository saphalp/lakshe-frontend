import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function CallToActionCard() {
  return (
    <div className='mt-20 lg:mt-40 font-sans text-white px-4 md:px-8 lg:px-40'>
      <div className="flex flex-col justify-center items-center gap-5 bg-indigo-700 py-10 md:py-20 px-4 rounded-xl">
        <p className='text-3xl md:text-5xl font-extrabold text-center'>Ready to launch your career?</p>
        <p className='text-center text-gray-200 w-full md:w-2/3 lg:w-1/2'>Join 50,000+ professionals who have already used Lakshe to find their dream jobs.</p>
        <div className='flex flex-col sm:flex-row items-center gap-3 md:gap-4'>
            <Link href='/sign-up'><Button variant={'default'} size={'lg'} className="w-full sm:w-auto"> Get Started Now </Button></Link>
            <p className="text-sm md:text-base text-gray-300">No credit card required.</p>
        </div>
      </div>
    </div>
  )
}

export default CallToActionCard
