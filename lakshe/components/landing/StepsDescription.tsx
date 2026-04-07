import { Trophy } from "lucide-react";
import Stepper from "../sign-up/Stepper"

const steps = [
  {
    number: 1,
    title: "Build Profile",
    description: "Create an account and list your skills/experiences.",
    isLast: false,

  },
  {
    number: 2,
    title: "Targeted Hunt",
    description: "Automated outreach to the companies you love.",
    isLast: false,

  },
  {
    number: 3,
    title: "AI Optimization",
    description: "Our AI polishes your resume for the selected job.",
    isLast: false,

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
    <div className="my-20 lg:my-50 text-white font-sans px-4 md:px-8 lg:px-40 overflow-hidden" id="how-it-works">
    <p className="text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-25">Your path to success in 4 steps</p>
    <div className="overflow-x-auto pb-4">
      <Stepper steps={steps} size="md"/>
    </div>
    </div>
  );
}