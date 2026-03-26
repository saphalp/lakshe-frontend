import React from "react";
import { Badge } from "@/components/ui/badge";
import { JobDropdownMenu } from "./JobDropdownMenu";

interface jobCardProps {
  company: string;
  role: string;
  status: string;
  notes: string;
}

function DashboardJobCard({ company, role, status, notes }: jobCardProps) {
  return (
    <div
      className={`bg-card flex flex-col p-4 rounded-lg gap-3 h-40 justify-between`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-bold">{company}</p>
          <JobDropdownMenu status={status} />
        </div>
        <p className="text-sm text-muted">{role}</p>
        <p className="text-xs text-gray-400">{notes}</p>
      </div>
      <div className="flex justify-between">
        <Badge variant="default">Remote</Badge>
      </div>
    </div>
  );
}

export default DashboardJobCard;
