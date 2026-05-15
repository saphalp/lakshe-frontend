import React from "react";

interface headerProps {
  header: string;
}

function AppTrackerHeader({ header }: headerProps) {
  return (
    <div className="bg-secondary rounded-md px-3 py-2">
      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
        {header}
      </p>
    </div>
  );
}

export default AppTrackerHeader;
