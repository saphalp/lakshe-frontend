import Stepper from "../sign-up/Stepper";

const steps = [
  {
    number: 1,
    title: "Build Your Profile",
    description: "Create your account and add your skills, education, and work experience.",
    isLast: false,
  },
  {
    number: 2,
    title: "Discover Jobs",
    description: "Browse curated listings from LinkedIn, Indeed, and Glassdoor in one place.",
    isLast: false,
  },
  {
    number: 3,
    title: "AI Optimization",
    description: "Generate a tailored, ATS-beating resume for any job with one click.",
    isLast: false,
  },
  {
    number: null,
    title: "Land the Offer",
    description: "Crush the interviews and sign your dream offer.",
    isLast: true,
  },
];

export default function StepsDescription() {
  return (
    <section
      className="my-20 lg:my-40 px-4 md:px-8 lg:px-20 overflow-hidden"
      id="how-it-works"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12 md:mb-20">
        Your path to hired — in 4 steps
      </h2>
      <div className="overflow-x-auto pb-4">
        <Stepper steps={steps} size="md" />
      </div>
    </section>
  );
}
