"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface FAQProps {
  question: string;
  ans: string;
}

export function FAQCard({ question, ans }: FAQProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-xl bg-card border border-border transition-colors hover:border-brand/30"
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between gap-4 w-full px-6 py-5 text-left cursor-pointer">
          <p className="font-semibold text-foreground text-base md:text-lg">
            {question}
          </p>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="px-6 pb-5 text-muted-foreground text-sm md:text-base leading-relaxed">
          {ans}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
