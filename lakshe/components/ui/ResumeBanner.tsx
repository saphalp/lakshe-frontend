import React from 'react'

function ResumeBanner() {
  return (
    <div className='flex justify-between gap-10 py-4 px-20 font-sans mt-50'>
      <div className='w-1/2'>
        <div className='bg-white font-mono pt-10 px-10 pb-4 shadow-[0_0_75px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:-translate-y-2'>
            <div className='text-center'>
            <p className='text-6xl'>Saphal Pant</p>
            <p>737-296-3557 | spa049@latech.edu | linkedin.com/in/saphalpant | github.com/saphalp | Ruston, LA</p>
            </div>
            <div className='my-4 text-md'>
                <p className='text-xl'> Education </p>
                <hr/>
                <div>
                <p className='font-bold inline-block w-1/2'>Louisiana Tech University</p>
                <p className='inline-block w-1/2 text-right'>Ruston, LA</p>
                </div>
                <div>
                <p className='inline-block w-1/2'>Bachelor of Science in Computer Science (GPA 3.78)</p>
                <p className='inline-block w-1/2 text-right'>Sep. 2023 – Nov. 2026</p>
                </div>
            </div>
            <div className='my-4'>
                <p className='text-xl'> Experiences </p>
                <hr/>
                <div>
                <p className='font-bold inline-block w-1/2'>IT Solutions Intern</p>
                <p className='inline-block w-1/2 text-right'>June. 2025 – Present</p>
                </div>
                <div>
                <p className='inline-block w-1/2'>Dis-Tran Steel</p>
                <p className='inline-block w-1/2 text-right'>Pineville, LA</p>
                </div>
                <div>
                    <ul className='list-disc px-10'>
                        <li>Designed and deployed a Shop Call App using Power Platform (Power Apps + Power Automate) as a ticketing
                        system between factory floor and engineering teams, streamlining change management.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
      <div className='w-1/2 ml-10'>
        <div className='text-6xl font-bold'>
        <p className='text-white'> A resume that recruiters </p>
        <span className='text-emerald-300'>(and ATS)</span>
        <span className='text-white'> will love. </span>
        </div>
        <div className='mt-10'>
            <ul className='text-white text-lg flex flex-col gap-5'>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-emerald-300 inline mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> ATS-Optimized structure for 99% readability.</li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-emerald-300 inline mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> AI-powered bullet point rewriting for maximum impact.</li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-emerald-300 inline mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> One-click tailoring to any specific job description.</li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-emerald-300 inline mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> Export to professional PDF or DOCX instantly.</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ResumeBanner
