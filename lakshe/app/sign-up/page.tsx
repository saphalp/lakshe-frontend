"use client"

import React from "react"
import { useStep } from "@/context/StepContext"
import { FormProvider } from "@/context/FormContext"
import SignInForm from "@/components/ui/SignInForm"
import EducationForm from "@/components/ui/EducationForm"
import SkillsForm from "@/components/ui/SkillsForm"
import ExperienceForm from "@/components/ui/ExperienceForm"

const FORMS: Record<number, React.ReactNode> = {
  1: <SignInForm />,
  2: <EducationForm />,
  3: <SkillsForm />,
  4: <ExperienceForm />,
}

export default function SignUpPage() {
  const { currentStep } = useStep()

  return (
    <FormProvider>
      <div className="w-full">
        {FORMS[currentStep] ?? null}
      </div>
    </FormProvider>
  )
}
