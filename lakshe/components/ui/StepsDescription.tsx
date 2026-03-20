import { Trophy } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Build Profile",
    description: "Create an account and list your skills/experiences.",
  },
  {
    number: 2,
    title: "Targeted Hunt",
    description: "Automated outreach to the companies you love.",
  },
  {
    number: 3,
    title: "AI Optimization",
    description: "Our AI polishes your resume for the selected job.",
  },
  {
    number: null,
    title: "Land the Job",
    description: "Crush the interviews and sign your dream offer.",
    isLast: true,
  },
];

export default function StepsDescription() {
  return (
    <div className="my-50 text-white font-sans">
    <p className="text-4xl font-extrabold text-center mb-25">Your path to success in 4 steps</p>
    <div className="flex items-start w-full px-40">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start flex-1">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center w-full">
              <div
                className={`flex-1 h-px ${
                  index === 0 ? "invisible" : "bg-slate-600"
                }`}
              />
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 font-bold text-base
                  ${
                    step.isLast
                      ? "border-emerald-400 text-emerald-400 bg-transparent"
                      : index === 0
                      ? "border-indigo-400 bg-indigo-500/30 text-white"
                      : "border-indigo-800 bg-indigo-900/40 text-slate-300"
                  }`}
              >
                {step.isLast ? (
                  <Trophy className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div
                className={`flex-1 h-px ${
                  index === steps.length - 1 ? "invisible" : "bg-slate-600"
                }`}
              />
            </div>

            <div className="mt-4 text-center px-2">
              <p className="text-white font-semibold text-xl">{step.title}</p>
              <p className="text-slate-400 text-md mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}