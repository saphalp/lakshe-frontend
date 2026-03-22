"use client"

import React, { useState } from "react"
import { useStep } from "@/context/StepContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export default function SkillsForm() {
  const { nextStep, prevStep } = useStep()
  const [skills, setSkills] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addSkill = () => {
    const trimmed = input.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed])
    }
    setInput("")
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="skill-input" className="text-xs font-bold text-gray-400">ADD SKILLS</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            placeholder="e.g. TypeScript"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" variant="outline" onClick={addSkill} className="w-30">
            Add
          </Button>
        </div>
        <p className="text-xs text-slate-400">Press Enter or click Add to add a skill</p>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Button type="button" variant="outline" onClick={prevStep} className="w-30">
          Back
        </Button>
        <Button type="submit" className="w-30">
          Continue
        </Button>
      </div>
    </form>
  )
}
