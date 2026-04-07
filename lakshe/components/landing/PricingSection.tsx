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
    active: true,
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
    active: false,
  },
];

function PricingSection() {
  return (
    <div className="font-sans mt-20 lg:mt-40 px-4 md:px-8">
      <div className="text-center text-white" id="pricing">
        <p className="text-4xl font-extrabold">Simple, transparent pricing</p>
        <p className="text-lg mt-3 text-[oklch(55.4%_0.046_257.417)] max-w-xl mx-auto">
          Affordable plans built to support your career growth without the
          hassle.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-10 mt-10">
        {pricingOptions.map((item, index) => (
          <PricingCard
            key={index}
            plan={item.plan}
            price={item.price}
            description={item.description}
            includes={item.includes}
            feature={item.feature}
            active={item.active}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
