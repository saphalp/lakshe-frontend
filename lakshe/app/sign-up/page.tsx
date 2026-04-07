"use client"

import React from "react"
import { useStep } from "@/context/StepContext"
import { FormProvider } from "@/context/FormContext"
import SignInForm from "@/components/sign-up/SignInForm"
import EducationForm from "@/components/sign-up/EducationForm"
import SkillsForm from "@/components/sign-up/SkillsForm"
import ExperienceForm from "@/components/sign-up/ExperienceForm"

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
