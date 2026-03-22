"use client"

import React from "react"
import { Trophy, Check } from "lucide-react"
import { useStep } from "@/context/StepContext"

type StepperSize = "sm" | "md" | "lg"

interface Step {
  number: number | null
  title: string
  description: string
  isLast: boolean
}

interface StepperProps {
  steps: Step[]
  size?: StepperSize
}

const sizeStyles: Record<
  StepperSize,
  {
    title: string
    description: string
    stepNumber: string
    icon: string
    circle: string
  }
> = {
  sm: {
    title: "text-sm",
    description: "text-xs",
    stepNumber: "text-sm",
    icon: "w-3 h-3",
    circle: "w-8 h-8",
  },
  md: {
    title: "text-xl",
    description: "text-md",
    stepNumber: "text-base",
    icon: "w-5 h-5",
    circle: "w-12 h-12",
  },
  lg: {
    title: "text-2xl",
    description: "text-lg",
    stepNumber: "text-lg",
    icon: "w-7 h-7",
    circle: "w-16 h-16",
  },
}

// Each step's logical index (1-based)
function stepIndex(step: Step, allSteps: Step[]): number {
  return allSteps.indexOf(step) + 1
}

function Stepper({ steps, size = "md" }: StepperProps) {
  const s = sizeStyles[size]
  const { currentStep } = useStep()

  return (
    <div className="flex items-start w-full">
      {steps.map((step, index) => {
        const logicalIndex = index + 1
        const isCompleted = logicalIndex < currentStep
        const isActive = logicalIndex === currentStep
        const isPending = logicalIndex > currentStep

        // Connector line after this step (between this and next)
        const connectorCompleted = currentStep > logicalIndex

        return (
          <div key={index} className="flex items-start flex-1">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                {/* Left connector */}
                <div
                  className={`flex-1 h-px transition-colors duration-500 ${
                    index === 0
                      ? "invisible"
                      : currentStep > index
                      ? "bg-indigo-400"
                      : "bg-slate-600"
                  }`}
                />

                {/* Circle */}
                <div
                  className={`
                    ${s.circle} rounded-full flex items-center justify-center shrink-0 border-2 font-bold ${s.stepNumber}
                    transition-all duration-500
                    ${
                      isCompleted
                        ? "border-indigo-400 bg-indigo-500 text-white"          // done
                        : isActive && step.isLast
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-400" // active last
                        : isActive
                        ? "border-indigo-400 bg-indigo-500/30 text-white"        // active
                        : step.isLast
                        ? "border-emerald-800 bg-transparent text-emerald-800"   // pending last
                        : "border-indigo-800 bg-indigo-900/40 text-slate-500"    // pending
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className={s.icon} />
                  ) : step.isLast ? (
                    <Trophy className={`${s.icon} ${isActive ? "text-emerald-400" : "text-emerald-800"}`} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Right connector */}
                <div
                  className={`flex-1 h-px transition-colors duration-500 ${
                    index === steps.length - 1
                      ? "invisible"
                      : connectorCompleted
                      ? "bg-indigo-400"
                      : "bg-slate-600"
                  }`}
                />
              </div>

              {/* Labels */}
              <div className="mt-4 text-center px-2">
                <p
                  className={`font-semibold ${s.title} transition-colors duration-300 ${
                    isCompleted
                      ? "text-indigo-400"
                      : isActive
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  {step.title}
                </p>
                {step.description ? (
                  <p className={`text-slate-400 mt-1 leading-relaxed ${s.description}`}>
                    {step.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Stepper
