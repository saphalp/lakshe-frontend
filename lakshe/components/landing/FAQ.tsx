import React from "react";
import { FAQCard } from "@/components/landing/FAQCard";

const faq = [
  {
    question: "How does AI optimize my resume?",
    ans: "Lakshe analyzes your resume against the job description to identify keyword gaps and ATS weaknesses. It rewrites bullet points to emphasize measurable impact, aligns your language with what the target role looks for, and tailors the content — all in seconds.",
  },
  {
    question: "Is my data secure?",
    ans: "Yes. Your resume and personal data are encrypted in transit and at rest. We never sell your data to third parties, and you can permanently delete your account and all associated data from settings at any time.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    ans: "Absolutely. No contracts or cancellation fees. Cancel from your account dashboard in a few clicks. Your access continues until the end of the current billing period — no further charges after that.",
  },
  {
    question: "Can I apply for jobs through Lakshe directly?",
    ans: "Not directly — but we make it seamless. Lakshe surfaces job listings from LinkedIn, Indeed, and Glassdoor. When you find a role, you're taken to the original posting to apply. Direct apply functionality is on our roadmap.",
  },
];

function FAQ() {
  return (
    <section
      className="mt-20 lg:mt-40 flex flex-col items-center px-4 md:px-8 lg:px-20"
      id="faq"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-3 mt-10 w-full md:w-5/6 lg:w-2/3">
        {faq.map((item) => (
          <FAQCard key={item.question} question={item.question} ans={item.ans} />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
