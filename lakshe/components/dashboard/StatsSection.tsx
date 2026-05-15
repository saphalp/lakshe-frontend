import React from "react";
import { Bookmark, FileText, Sparkles, Video } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

interface Props {
  saved: number;
  applied: number;
  interviews: number;
  resumesGenerated: number;
}

function StatsSection({ saved, applied, interviews, resumesGenerated }: Props) {
  const cards = [
    { title: "Jobs Saved", value: saved, icon: <Bookmark className="w-4 h-4" /> },
    { title: "Applications", value: applied, icon: <FileText className="w-4 h-4" /> },
    { title: "Resumes Generated", value: resumesGenerated, icon: <Sparkles className="w-4 h-4" /> },
    { title: "Interviews", value: interviews, icon: <Video className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default StatsSection;
