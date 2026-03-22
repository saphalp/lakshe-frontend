"use client"

import React, { useState } from "react"
import { useStep } from "@/context/StepContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "./card"


export default function ExperienceForm() {
  const { prevStep } = useStep()

  const [form, setForm] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: persist data & redirect / show success
    console.log("All steps complete — submit full form payload here")
  }

  return (
    <Card>
    <CardContent className="text-gray-400">
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="company">COMPANY</Label>
        <Input
          id="company"
          name="company"
          placeholder="e.g. Acme Corp"
          value={form.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role">ROLE</Label>
        <Input
          id="role"
          name="role"
          placeholder="e.g. Software Engineer"
          value={form.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="startDate">START DATE</Label>
          <Input
            id="startDate"
            name="startDate"
            type="month"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="endDate">END DATE</Label>
          <Input
            id="endDate"
            name="endDate"
            type="month"
            value={form.endDate}
            onChange={handleChange}
            placeholder="Leave blank if current"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">DESCRIPTION</Label>
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
        <Button type="button" variant="outline" onClick={prevStep} className="w-30">
          Back
        </Button>
        <Button type="submit" className="w-30">Finish</Button>
      </div>
    </form>
    </CardContent>
    </Card>
  )
}
