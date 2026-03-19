import React from 'react'

interface FeatureCardProps {
    header: string,
    description : string
    icon: any
}

function FeatureCard({header, description, icon} : FeatureCardProps) {
  return (
    <div className='flex flex-col rounded-lg border-1
     border-gray-400 gap-4 p-10 w-100 bg-card transition-transform duration-300 hover:-translate-y-2
     shadow-none transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'>  
      <p className='font-bold text-white text-xl'>{icon} {header}</p>
      <p className='text-gray-400'>{description}</p>
    </div>
  )
}

export default FeatureCard
