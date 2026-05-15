import React from "react";
import PricingCard from "./PricingCard";

const pricingOptions = [
  {
    plan: "Free",
    feature: false,
    description: "Start your search with the essential tools",
    price: "0",
    includes: [
      "3 AI-tailored resumes per month",
      "Basic job matching",
      "3 interview prep sessions per week",
      "Application tracker (up to 20 jobs)",
    ],
    active: true,
  },
  {
    plan: "Pro",
    feature: true,
    description: "Everything you need to dominate the market",
    price: "9.99",
    includes: [
      "Unlimited AI-tailored resumes",
      "Advanced job matching & alerts",
      "Unlimited interview prep",
      "Full application tracker",
    ],
    active: false,
  },
];

function PricingSection() {
  return (
    <section className="mt-20 lg:mt-40 px-4 md:px-8" id="pricing">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Simple, transparent pricing
        </h2>
        <p className="text-base md:text-lg mt-3 text-muted-foreground max-w-xl mx-auto">
          Start free and upgrade when you're ready. No hidden fees, no
          lock-ins.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 mt-12 max-w-2xl mx-auto">
        {pricingOptions.map((item) => (
          <PricingCard
            key={item.plan}
            plan={item.plan}
            price={item.price}
            description={item.description}
            includes={item.includes}
            feature={item.feature}
            active={item.active}
          />
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
