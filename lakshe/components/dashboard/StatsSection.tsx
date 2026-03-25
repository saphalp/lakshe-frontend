import React from "react";
import { Bookmark, FileText, Send, Video } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

const card = [
  {
    title: "Jobs Saved",
    value: 12,
    icon: <Bookmark />,
  },
  {
    title: "Applications",
    value: 4,
    icon: <FileText />,
  },
  {
    title: "Resume Generated",
    value: 2,
    icon: <Send />,
  },
  {
    title: "Interviews",
    value: 0,
    icon: <Video />,
  },
];

function StatsSection() {
  return (
    <div className="flex gap-4">
      {card.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default StatsSection;
