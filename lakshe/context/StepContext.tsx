"use client"

import React, { createContext, useContext, useState } from "react"

interface StepContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
}

const StepContext = createContext<StepContextType | null>(null)

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep, nextStep, prevStep }}>
      {children}
    </StepContext.Provider>
  )
}

export function useStep() {
  const ctx = useContext(StepContext)
  if (!ctx) throw new Error("useStep must be used inside StepProvider")
  return ctx
}
