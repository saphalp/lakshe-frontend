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
  onEdit: () => void;
  onDelete: () => void;
}
function InfoDisplayCard({ experience, onEdit, onDelete }: InfoCardProps) {
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
          <button type="button" onClick={onEdit} className="hover:text-white transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button type="button" onClick={onDelete} className="hover:text-red-400 transition-colors">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="py-2">
        <p>{experience.description}</p>
      </div>
    </div>
  );
}

export default InfoDisplayCard;
