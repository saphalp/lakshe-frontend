import React from 'react'

interface FeatureCardProps {
    header: string,
    description : string
    icon: any
}

function FeatureCard({header, description, icon} : FeatureCardProps) {
  return (
    <div className='flex flex-col rounded-lg border-1
     border-gray-400 gap-4 p-10 w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.666rem)] max-w-sm bg-card transition-transform duration-300 hover:-translate-y-2
     shadow-none hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'>  
      <p className='font-bold text-white text-xl'>{icon} {header}</p>
      <p className='text-gray-400'>{description}</p>
    </div>
  )
}

export default FeatureCard
