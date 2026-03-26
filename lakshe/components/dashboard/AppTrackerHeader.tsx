import React from "react";

interface headerProps {
  header: String;
}

function AppTrackerHeader({ header }: headerProps) {
  return (
    <div className="bg-card p-2 rounded-sm">
      <p className="text-gray-400 text-sm">{header}</p>
    </div>
  );
}

export default AppTrackerHeader;
