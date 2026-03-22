"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Experiences = {
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

type Education = {
    institution: string
    degree: string
    field: string
    startYear: string
    endYear: string
}


export type FormData = {
  email: string
  password: string
  education: Education[]
  experiences: Experiences[]
  skills: string[]
}

const initialFormData: FormData = {
  email: "",
  password: "",
  education: [],
  experiences: [],
  skills: [],
}

type FormContextValue = {
  formData: FormData
  updateFormData: (fields: Partial<FormData>) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = useCallback((fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }, [])

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormData() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error("useFormData must be used inside <FormProvider>")
  return ctx
}
