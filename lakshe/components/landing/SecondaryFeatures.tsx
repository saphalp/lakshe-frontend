import React from 'react'

function SecondaryFeatures() {
  return (
    <div className='flex flex-col lg:flex-row text-white px-4 md:px-8 lg:px-40 font-sans mt-20 lg:mt-50 gap-10'>
      <div className='w-full lg:w-1/2 flex flex-col gap-5'>
          <p className='text-4xl font-extrabold'>Stop wasting months on ghosted applications.</p>
          <p className='text-lg text-gray-400'>The traditional job search is broken. ATS filters hide great candidates, and recruiters spend 6 seconds on a resume. Lakshe flips the script.</p>
          <div className='flex flex-col gap-3'>
            <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline mr-2 stroke-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> Spent 40+ hours per week applying manually</p>
            <p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline mr-2 stroke-emerald-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>Apply to 50 targeted roles in 5 minutes with AI</p>
          </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-5 items-center w-full lg:w-1/2 justify-center lg:justify-end'>
        <div className='flex flex-col rounded-lg border-1
        border-gray-400 gap-4 p-8 w-full sm:w-1/2 max-w-[320px] lg:w-80 bg-card justify-center h-full sm:h-2/3 lg:h-2/3'>  
          <p className='font-bold text-emerald-400 text-5xl lg:text-6xl'>85%</p>
          <p className='text-gray-400 lg:text-base text-sm'>Faster callback rate compared to traditional methods.</p>
        </div>
        <div className='flex flex-col rounded-lg border-1
        border-gray-400 gap-4 p-8 w-full sm:w-1/2 max-w-[320px] lg:w-80 bg-card justify-center h-full sm:h-2/3 lg:h-2/3'>  
          <p className='font-bold text-blue-400 text-5xl lg:text-6xl'>3.5x</p>
          <p className='text-gray-400 lg:text-base text-sm'>Average salary increase for platform users.</p>
        </div>
      </div>
    </div>
  )
}

export default SecondaryFeatures
