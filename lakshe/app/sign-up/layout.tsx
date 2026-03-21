import React from 'react'
import Stepper from '@/components/ui/Stepper'

const steps = [
  {
    number: 1,
    title: "Account",
    description: "",
    isLast: false,

  },
  {
    number: 2,
    title: "Education",
    description: "",
    isLast: false,

  },
  {
    number: 3,
    title: "Skills",
    description: "",
    isLast: false,

  },
  {
    number: null,
    title: "Experience",
    description: "",
    isLast: true,
  },
];

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center text-white font-sans mt-20 gap-10">
      <div>
        <p className='text-3xl font-extrabold'>Your career, perfectly positioned.</p>
      </div>
      <Stepper steps={steps}/>   
      <main>{children}</main> 
    </div>
  )
}
