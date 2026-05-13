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
    { title: "Jobs Saved",       value: saved,            icon: <Bookmark /> },
    { title: "Applications",     value: applied,          icon: <FileText /> },
    { title: "Resume Generated", value: resumesGenerated, icon: <Sparkles /> },
    { title: "Interviews",       value: interviews,       icon: <Video />    },
  ];

  return (
    <div className="flex gap-4">
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
