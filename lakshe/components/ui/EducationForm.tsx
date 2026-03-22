"use client"

import React, { useState } from "react"
import { useStep } from "@/context/StepContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "./card"
import { Group, X } from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useFormData } from "@/context/FormContext"


export default function EducationForm() {
  const { nextStep, prevStep } = useStep()
  const { formData, updateFormData } = useFormData()
  const [educations, setEducations] = useState<EducationEntry[]>(formData.education)



  type EducationEntry = {
    institution: string
    degree: string
    field: string
    startYear: string
    endYear: string
  }

    const [form, setForm] = useState<EducationEntry>({
    institution: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateFormData({education: educations})
    // TODO: validate & persist form data
    nextStep()
  }

const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
  setEducations((prev) => [...prev, form])
  setForm({ institution: "", degree: "", field: "", startYear: "", endYear: "" })
}

const removeEducation = (education: EducationEntry) => {
    setEducations((prev) => prev.filter((s) => s !== education))
}

  return (
    <>
    <div className="flex flex-col gap-4 mb-6">
    {educations.map((item, index) => (
    <Item variant='default' className="bg-card" key={index}>
        <ItemContent>
          <ItemTitle>{item.institution}</ItemTitle>
          <ItemDescription>
            {item.degree} ({item.field}) {item.startYear}-{item.endYear}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <button
                type="button"
                onClick={() => removeEducation(item)}
                className="hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
        </button>
        </ItemActions>
    </Item>
    ))}
    </div>
    <Card>
    <CardContent className="text-gray-400">
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label className='text-xs font-bold' htmlFor="institution">INSTITUTION</Label>
        <Input
          id="institution"
          name="institution"
          placeholder="e.g. MIT"
          value={form.institution}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="degree" className='text-xs font-bold'>DEGREE</Label>
        <Input
          id="degree"
          name="degree"
          placeholder="e.g. Bachelor of Science"
          value={form.degree}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="field" className='text-xs font-bold'>FIELD OF STUDY</Label>
        <Input
          id="field"
          name="field"
          placeholder="e.g. Computer Science"
          value={form.field}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="startYear" className='text-xs font-bold'>START YEAR</Label>
          <Input
            id="startYear"
            name="startYear"
            placeholder="2018"
            value={form.startYear}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="endYear" className='text-xs font-bold'>END YEAR</Label>
          <Input
            id="endYear"
            name="endYear"
            placeholder="2022"
            value={form.endYear}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <Button type="button" variant="outline" onClick={prevStep} className="w-30 bg-transparent">
          Back
        </Button>
        <div>
        <Button onClick={handleAdd} type="button" className="w-30 bg-indigo-700 mr-3">Add another</Button>
        <Button type="submit" className="w-30">Continue</Button>
        </div>
      </div>
    </form>
    </CardContent>
    </Card>
    </>
  )
}
