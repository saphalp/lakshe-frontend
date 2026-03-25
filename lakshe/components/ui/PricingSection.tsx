import React from "react";
import PricingCard from "./PricingCard";

const pricingOptions = [
  {
    plan: "Basic",
    feature: false,
    description: "Perfect to try out the features",
    price: "0",
    includes: [
      "3 AI resumes per month",
      "Basic job matching",
      "3 Interview preps per week",
    ],
  },
  {
    plan: "Pro",
    feature: true,
    description: "Perfect to try out the features",
    price: "9.99",
    includes: [
      "Unlimited AI resumes",
      "Advanced job matching",
      "Unlimited Interview preps",
    ],
  },
];

function PricingSection() {
  return (
    <div className="font-sans mt-40">
      <div className="text-center text-white" id="pricing">
        <p className="text-4xl font-extrabold">Simple, transparent pricing</p>
        <p className="text-lg mt-3 text-[oklch(55.4%_0.046_257.417)]">
          Affordable plans built to support your career growth without the
          hassle.
        </p>
      </div>
      <div className="flex justify-center gap-10 mt-10">
        {pricingOptions.map((item, index) => (
          <PricingCard
            key={index}
            plan={item.plan}
            price={item.price}
            description={item.description}
            includes={item.includes}
            feature={item.feature}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
