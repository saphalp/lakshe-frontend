import React from "react";
import AppTrackerHeader from "./AppTrackerHeader";

const headers = ["Saved", "Applied", "Interviewd", "Offered/Rejected"];

function ApplicationTracker() {
  return (
    <div>
      <p className="text-xl font-bold">Application Tracker</p>
      <div className="flex gap-4 my-5">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 w-full bg-card p-2 rounded-sm"
          >
            <AppTrackerHeader header={header} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationTracker;
