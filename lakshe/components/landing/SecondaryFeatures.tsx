import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

const stats = [
  {
    value: "85%",
    color: "text-success",
    description: "Faster interview callback rate vs. traditional job search.",
  },
  {
    value: "3.5×",
    color: "text-brand",
    description: "Average salary increase reported by Lakshe users.",
  },
];

function SecondaryFeatures() {
  return (
    <section className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-20 mt-20 lg:mt-40 gap-12 items-center">
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-snug">
          Stop getting ghosted. Start getting hired.
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          The traditional job search is broken. ATS filters filter out great
          candidates before a human even looks, and recruiters spend just 6
          seconds on a resume. Lakshe flips the script.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-sm">
              Spent 40+ hours per week applying manually with no results
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <p className="text-foreground text-sm">
              Apply to 50 targeted roles in 5 minutes using AI-optimized resumes
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-1/2 justify-center lg:justify-end">
        {stats.map((s) => (
          <div
            key={s.value}
            className="flex flex-col rounded-xl border border-border gap-4 p-8 w-full sm:w-1/2 max-w-xs bg-card"
          >
            <p className={`font-extrabold text-5xl lg:text-6xl ${s.color}`}>
              {s.value}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SecondaryFeatures;
