import React from "react";
import { Save } from "lucide-react";

interface CardProps {
  title: string;
  icon: any;
  value: number;
}

function StatsCard({ title, icon, value }: CardProps) {
  return (
    <div className="flex flex-col p-6 bg-card rounded-lg w-full justify-between">
      <div className="flex justify-between text-gray-400">
        <p>{title}</p>
        {icon}
      </div>
      <div>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
