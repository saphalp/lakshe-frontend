import React from "react";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "ATS-optimized structure for maximum readability",
  "AI-powered bullet point rewriting for measurable impact",
  "One-click tailoring to any specific job description",
  "Export to professional PDF instantly",
];

function ResumeBanner() {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-12 py-4 px-4 md:px-8 lg:px-20 mt-20 lg:mt-40">
      {/* Resume Preview */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white font-mono pt-10 px-6 sm:px-10 pb-6 shadow-[0_0_60px_rgba(79,128,245,0.2)] rounded-lg transition-transform duration-300 hover:-translate-y-1 text-xs sm:text-sm text-gray-800 overflow-hidden">
          <div className="text-center border-b border-gray-200 pb-4 mb-4">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              Alex Johnson
            </p>
            <p className="text-xs mt-2 text-gray-500">
              alex@email.com · linkedin.com/in/alexjohnson · github.com/alexj
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">
              Education
            </p>
            <hr className="border-gray-200 mb-2" />
            <div className="flex justify-between">
              <p className="font-semibold">State University</p>
              <p>San Francisco, CA</p>
            </div>
            <div className="flex justify-between text-gray-500">
              <p>B.S. Computer Science (GPA 3.9)</p>
              <p>Aug 2020 – May 2024</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">
              Experience
            </p>
            <hr className="border-gray-200 mb-2" />
            <div className="flex justify-between">
              <p className="font-semibold">Software Engineering Intern</p>
              <p>June 2023 – Aug 2023</p>
            </div>
            <p className="text-gray-500">TechCorp · Austin, TX</p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
              <li>
                Reduced API response time by 40% by refactoring auth middleware
                using Redis caching
              </li>
              <li>
                Shipped 3 customer-facing features that drove 12% increase in
                DAU
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">
              Skills
            </p>
            <hr className="border-gray-200 mb-2" />
            <p className="text-gray-600">
              TypeScript · React · Node.js · PostgreSQL · AWS · Docker
            </p>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
          A resume recruiters{" "}
          <span className="text-success">(and ATS)</span> will love.
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-foreground">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ResumeBanner;
