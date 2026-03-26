import React from "react";
import AppTrackerHeader from "./AppTrackerHeader";
import DashboardJobCard from "./DashboardJobCard";

const headers = ["Saved", "Applied", "Interview", "Rejected"];
const userJobs = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    status: "Applied",
    notes: "Applied through careers page. Waiting for response.",
  },
  {
    company: "Microsoft",
    role: "Cloud Engineer Intern",
    status: "Interview",
    notes: "Completed first round. Preparing for technical interview.",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    status: "Rejected",
    notes: "Rejected after OA. Need to improve DSA.",
  },
  {
    company: "Meta",
    role: "Frontend Engineer Intern",
    status: "Rejected",
    notes: "Received offer. Deadline in 2 weeks.",
  },
  {
    company: "Netflix",
    role: "Backend Engineer Intern",
    status: "Saved",
    notes: "Referred by a friend.",
  },
  {
    company: "Tesla",
    role: "Software Engineer",
    status: "Interview",
    notes: "Phone screen scheduled next week.",
  },
  {
    company: "Apple",
    role: "iOS Developer Intern",
    status: "Applied",
    notes: "Customized resume for this role.",
  },
  {
    company: "Stripe",
    role: "Full Stack Engineer Intern",
    status: "Offered",
    notes: "Offer received, evaluating compensation.",
  },
];

function ApplicationTracker() {
  return (
    <div>
      <p className="text-xl font-bold">Application Tracker</p>

      <div className="flex gap-4 my-5">
        {headers.map((header, index) => (
          <div key={index} className="flex flex-col gap-3 w-full">
            <AppTrackerHeader header={header} />
            <div className="flex flex-col gap-3">
              {userJobs
                .filter((job) => job.status === header)
                .map((job, index) => (
                  <DashboardJobCard
                    key={index}
                    company={job.company}
                    notes={job.notes}
                    role={job.role}
                    status={job.status}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationTracker;
