"use client";

import React from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ResumeStatus = "pending" | "processing" | "done" | "failed" | null;

const STEPS: { key: ResumeStatus; label: string }[] = [
  { key: "pending",    label: "Queued"     },
  { key: "processing", label: "Generating" },
  { key: "done",       label: "Ready"      },
];

const MESSAGES: Record<string, { heading: string; sub: string }> = {
  pending: {
    heading: "Your resume is in the queue",
    sub: "The AI is warming up — something great is about to be crafted just for you.",
  },
  processing: {
    heading: "Crafting your perfect resume ✨",
    sub: "Deeply analyzing the job description and tailoring every bullet to make you stand out...",
  },
  failed: {
    heading: "Something went wrong",
    sub: "The AI hit a snag. Click Regenerate to try again.",
  },
  default: {
    heading: "Connecting...",
    sub: "Hold tight, spinning up your resume builder.",
  },
};

function getStepIndex(status: ResumeStatus): number {
  if (status === "pending")    return 0;
  if (status === "processing") return 1;
  if (status === "done")       return 2;
  return -1;
}

interface Props {
  status: ResumeStatus;
  jobTitle?: string;
  company?: string;
  onRegenerate?: () => void;
}

export function ResumeStatusOverlay({ status, jobTitle, company, onRegenerate }: Props) {
  const msg    = (status && MESSAGES[status]) ?? MESSAGES.default;
  const isFailed  = status === "failed";
  const stepIndex = getStepIndex(status);

  return (
    <div className="flex flex-col items-center justify-center flex-1 text-white py-16 w-full">
      {/* Icon ring */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          {isFailed
            ? <AlertCircle className="text-red-400" size={40} />
            : <Sparkles className="text-indigo-400" size={40} />
          }
        </div>
        {!isFailed && (
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border border-gray-700 flex items-center justify-center">
            <Loader2 className="text-indigo-400 animate-spin" size={18} />
          </div>
        )}
      </div>

      {/* Job context pill */}
      {(jobTitle || company) && (
        <p className="text-xs text-indigo-400 font-medium mb-4 tracking-widest uppercase">
          {jobTitle}{company ? ` · ${company}` : ""}
        </p>
      )}

      {/* Message */}
      <h2 className="text-2xl font-semibold text-center mb-3">{msg.heading}</h2>
      <p className="text-sm text-gray-400 text-center max-w-md mb-12 leading-relaxed">
        {msg.sub}
      </p>

      {/* Step progress */}
      {!isFailed && (
        <div className="flex items-center w-72">
          {STEPS.map((step, i) => {
            const isDone   = stepIndex > i;
            const isActive = stepIndex === i;
            return (
              <React.Fragment key={String(step.key)}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isDone
                        ? "bg-indigo-500 border-indigo-500"
                        : isActive
                        ? "border-indigo-400 bg-indigo-400/30 animate-pulse"
                        : "border-gray-600 bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium whitespace-nowrap ${
                      isDone || isActive ? "text-indigo-400" : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mb-5 mx-1.5 transition-all duration-500 ${
                      stepIndex > i ? "bg-indigo-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Failed action */}
      {isFailed && onRegenerate && (
        <Button
          onClick={onRegenerate}
          className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-sm"
        >
          Try Regenerating
        </Button>
      )}
    </div>
  );
}
