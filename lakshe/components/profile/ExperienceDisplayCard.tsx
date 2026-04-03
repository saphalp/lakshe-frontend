import { Pencil, Trash } from "lucide-react";
import React from "react";

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface InfoCardProps {
  experience: Experience;
}
function InfoDisplayCard({ experience }: InfoCardProps) {
  return (
    <div className="bg-card rounded-lg flex flex-col gap-3 p-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{experience.role}</p>
          <p className="text-sm text-primary">{experience.company}</p>
          <p className="text-sm text-gray-400">
            {experience.startDate} - {experience.endDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Pencil />
          <Trash />
        </div>
      </div>
      <div className="py-2 bg-">
        <p>{experience.description}</p>
      </div>
    </div>
  );
}

export default InfoDisplayCard;
