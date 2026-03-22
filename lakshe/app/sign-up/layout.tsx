import React from "react"
import Stepper from "@/components/ui/Stepper"
import { StepProvider } from "@/context/StepContext"

const steps = [
  { number: 1,    title: "Account",    description: "", isLast: false },
  { number: 2,    title: "Education",  description: "", isLast: false },
  { number: 3,    title: "Skills",     description: "", isLast: false },
  { number: null, title: "Experience", description: "", isLast: true  },
]

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <StepProvider>
      <div className="font-sans text-white mt-20 w-1/2 mx-auto">
        <div className="text-center flex flex-col gap-2">
          <p className="text-2xl font-extrabold">Your career, perfectly positioned.</p>
          <p className="text-md text-gray-400 text-center mt-2">
            Let's build something they can't ignore
          </p>
        </div>

        <div className="my-10">
          {/* Stepper reads currentStep from context internally */}
          <Stepper steps={steps} size="sm" />
        </div>

        <main className="w-full mx-auto">{children}</main>
      </div>
    </StepProvider>
  )
}
