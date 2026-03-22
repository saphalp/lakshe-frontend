import React from 'react'
import { Button } from './button'
import Link from 'next/link'

function CallToActionCard() {
  return (
    <div className='mt-40 font-sans text-white px-40'>
      <div className="flex flex-col justify-center items-center gap-5 bg-indigo-700 py-20 rounded-xl">
        <p className='text-5xl font-extrabold'>Ready to launch your career?</p>
        <p className='text-center text-gray-200 w-1/2'>Join 50,000+ professionals who have already used LaunchReady to find their dream jobs.</p>
        <div className='flex items-center gap-2'>
            <Link href='/sign-up'><Button variant={'default'} size={'lg'}> Get Started Now </Button></Link>
            <p>No credit card required.</p>
        </div>
      </div>
    </div>
  )
}

export default CallToActionCard
