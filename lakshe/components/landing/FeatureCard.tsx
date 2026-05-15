import React from "react";

interface FeatureCardProps {
  header: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ header, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border gap-4 p-8 w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.666rem)] bg-card transition-all duration-200 hover:border-brand/40 hover:bg-secondary group">
      <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center text-brand flex-shrink-0 group-hover:bg-brand/20 transition-colors">
        {icon}
      </div>
      <p className="font-semibold text-foreground text-lg">{header}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
