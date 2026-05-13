"use client";

import React from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  prompt: string;
  onPromptChange: (p: string) => void;
  onDownload: () => void;
  downloading: boolean;
  onRegenerate: () => void;
  regenerating: boolean;
}

export function ResumePromptSection({
  prompt,
  onPromptChange,
  onDownload,
  downloading,
  onRegenerate,
  regenerating,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label className="text-[10px] font-bold text-gray-400 tracking-wider">
          CUSTOM INSTRUCTIONS
        </Label>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Guide the AI when tailoring this resume to the job.
        </p>
      </div>
      <Textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g. Emphasize leadership and AWS skills. Keep it under one page. Use strong action verbs."
        rows={4}
        className="text-sm resize-none"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onDownload}
          disabled={downloading}
          className="flex-1 text-xs border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white disabled:opacity-50"
        >
          <Download size={13} className="mr-1.5" />
          {downloading ? "Generating PDF…" : "Download Resume"}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onRegenerate}
          disabled={regenerating}
          className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-500 border-0 disabled:opacity-50"
        >
          <RefreshCw
            size={13}
            className={`mr-1.5 ${regenerating ? "animate-spin" : ""}`}
          />
          {regenerating ? "Regenerating…" : "Regenerate"}
        </Button>
      </div>
    </div>
  );
}
