import React from "react";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
}

function StatsCard({ title, icon, value }: CardProps) {
  return (
    <div className="flex flex-col p-5 bg-card rounded-xl border border-border w-full justify-between gap-3 min-w-0">
      <div className="flex justify-between items-center text-muted-foreground">
        <p className="text-xs font-medium uppercase tracking-wide truncate pr-2">
          {title}
        </p>
        <span className="flex-shrink-0 w-4 h-4">{icon}</span>
      </div>
      <p className="text-foreground text-2xl md:text-3xl font-bold">{value}</p>
    </div>
  );
}

export default StatsCard;
