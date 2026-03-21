"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"

interface FAQProps {
    question : String,
    ans : String
}

export function FAQCard({question, ans} : FAQProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2 rounded-lg bg-card p-6 font-sans"
    >
        <CollapsibleTrigger asChild>
      <div className="flex items-center justify-between gap-4 px-4">
        <p className="text-xl font-semibold">{question}</p>
            <ChevronsUpDown />
      </div>
        </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <div>
            <p className="text-lg px-4">{ans}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
