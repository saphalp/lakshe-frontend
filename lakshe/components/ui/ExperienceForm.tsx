"use client"

import React, { useState } from "react"
import { useStep } from "@/context/StepContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "./card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { X } from "lucide-react"
import { useFormData } from "@/context/FormContext"




export default function ExperienceForm() {
  const { prevStep } = useStep()
  const { formData, updateFormData } = useFormData()
  const [experiences, setExperiences] = useState<ExperiencesEntry[]>(formData.experiences)

type ExperiencesEntry = {
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

const [form, setForm] = useState<ExperiencesEntry>({
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updated = [...experiences, form]
    updateFormData({ experiences: updated })
    //validation and submit logic
    console.log(formData)
  }

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updated = [...experiences, form]
    setExperiences((prev) => [...prev, form])
    setForm({ company: "", role: "", startDate: "", endDate: "", description: "" })
    updateFormData({experiences: updated})
  }

  const removeExperience = (experience: ExperiencesEntry) => {
    setExperiences((prev) => prev.filter((s) => s !== experience))
  }

  return (
    <>
    <div className="flex flex-col gap-4 mb-6">
    {experiences.map((item, index) => (
    <Item variant='default' className="bg-card" key={index}>
        <ItemContent>
          <ItemTitle>{item.company}</ItemTitle>
          <ItemDescription>
            {item.role} - ({item.description}) {item.startDate}-{item.endDate}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <button
                type="button"
                onClick={() => removeExperience(item)}
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
        <Label htmlFor="company" className='text-xs font-bold'>COMPANY</Label>
        <Input
          id="company"
          name="company"
          placeholder="e.g. Acme Corp"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role" className='text-xs font-bold'>ROLE</Label>
        <Input
          id="role"
          name="role"
          placeholder="e.g. Software Engineer"
          value={form.role}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="startDate" className='text-xs font-bold'>START DATE</Label>
          <Input
            id="startDate"
            name="startDate"
            type="month"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="endDate" className='text-xs font-bold'>END DATE</Label>
          <Input
            id="endDate"
            name="endDate"
            type="month"
            value={form.endDate}
            onChange={handleChange}
            placeholder="Leave blank if current"
            className="color-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className='text-xs font-bold'>DESCRIPTION</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Brief summary of your responsibilities and achievements"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="flex justify-between mt-2">
        <Button type="button" variant="outline" onClick={prevStep} className="w-30 bg-transparent">
          Back
        </Button>
        <div>
            <Button onClick={handleAdd} type="button" className="w-30 bg-indigo-700 mr-3">Add another</Button>
            <Button type="submit" className="w-30">Finish</Button>
        </div>
      </div>
    </form>
    </CardContent>
    </Card>
    </>
  )
}
