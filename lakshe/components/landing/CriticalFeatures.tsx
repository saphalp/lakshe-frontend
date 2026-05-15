import React from "react";
import FeatureCard from "./FeatureCard";
import {
  FileText,
  BrainCircuit,
  BarChart3,
  Bell,
  LayoutDashboard,
  Target,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="w-5 h-5" />,
    header: "AI Resume Architect",
    description:
      "Instantly tailor your resume to any job description. Beat ATS filters and land on the recruiter's desk — every time.",
  },
  {
    icon: <Target className="w-5 h-5" />,
    header: "Smart Job Matching",
    description:
      "Stop scrolling endlessly. We surface high-quality matches from LinkedIn, Indeed, and Glassdoor based on your exact profile.",
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    header: "Interview Simulator",
    description:
      "Practice with our AI coach and get real-time feedback on your answers before the actual interview.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    header: "Skill Gap Analysis",
    description:
      "Discover what you're missing for your target role and get a personalized roadmap to close the gap fast.",
  },
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    header: "Application Tracker",
    description:
      "Stay on top of every application. Track stages, follow-ups, and outcomes across a visual kanban board.",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    header: "Job Alert Engine",
    description:
      "Set your criteria once. Get notified the moment a matching role drops — no more manual searching.",
  },
];

function CriticalFeatures() {
  return (
    <section className="mt-20 lg:mt-32 px-4 md:px-8 lg:px-20" id="features">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          6 unfair advantages for your job search
        </h2>
        <p className="text-base md:text-lg mt-3 text-muted-foreground max-w-2xl mx-auto">
          Powerful tools designed to automate the heavy lifting so you can focus
          on showing up prepared.
        </p>
      </div>
      <div className="flex gap-6 mt-12 flex-wrap justify-center lg:justify-between">
        {features.map((f) => (
          <FeatureCard
            key={f.header}
            icon={f.icon}
            header={f.header}
            description={f.description}
          />
        ))}
      </div>
    </section>
  );
}

export default CriticalFeatures;
