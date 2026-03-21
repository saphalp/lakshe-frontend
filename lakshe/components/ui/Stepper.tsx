import React from 'react'
import { Trophy } from "lucide-react";

interface Step {
  number: number
  title: string
  description: string
  isLast: boolean
}

interface StepperProps {
  steps: Step[] 
}

function Stepper({ steps }: StepperProps) {
  return (
    <div className="flex items-start w-full px-40">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-start flex-1">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center w-full">
              <div
                className={`flex-1 h-px ${
                  index === 0 ? "invisible" : "bg-slate-600"
                }`}
              />
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 font-bold text-base
                  ${
                    step.isLast
                      ? "border-emerald-400 text-emerald-400 bg-transparent"
                      : index === 0
                      ? "border-indigo-400 bg-indigo-500/30 text-white"
                      : "border-indigo-800 bg-indigo-900/40 text-slate-300"
                  }`}
              >
                {step.isLast ? (
                  <Trophy className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div
                className={`flex-1 h-px ${
                  index === steps.length - 1 ? "invisible" : "bg-slate-600"
                }`}
              />
            </div>

            <div className="mt-4 text-center px-2">
              <p className="text-white font-semibold text-xl">{step.title}</p>
              <p className="text-slate-400 text-md mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stepper