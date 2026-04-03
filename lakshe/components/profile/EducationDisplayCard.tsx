import { Pencil, Trash } from "lucide-react";
import React from "react";

interface Education {
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa: Number;
}

interface InfoCardProps {
  education: Education;
}
function EducationDisplayCard({ education }: InfoCardProps) {
  return (
    <div className="bg-card rounded-lg flex flex-col gap-3 p-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{`${education.major} (${education.degree})`}</p>
          <p className="text-sm text-primary">{education.institution}</p>
          <p className="text-sm text-gray-400">
            {`${education.startDate} - ${education.endDate} (GPA: ${education.gpa})`}
          </p>
        </div>
        <div className="flex gap-2">
          <Pencil />
          <Trash />
        </div>
      </div>
    </div>
  );
}

export default EducationDisplayCard;
