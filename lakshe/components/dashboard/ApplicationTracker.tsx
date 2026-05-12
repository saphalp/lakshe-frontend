import React from "react";
import AppTrackerHeader from "./AppTrackerHeader";
import DashboardJobCard from "./DashboardJobCard";

type JobListing = {
  job_title: string | null;
  company: string | null;
  location: string | null;
  role_type: string | null;
};

type UserJob = {
  id: number;
  status: string;
  job_id: number;
  notes: string | null;
  jobs_listings: JobListing | null;
};

interface ApplicationTrackerProps {
  userJobs: UserJob[];
}

const COLUMNS: { label: string; status: string }[] = [
  { label: "Saved", status: "saved" },
  { label: "Applied", status: "applied" },
  { label: "Interview", status: "interview" },
  { label: "Rejected", status: "rejected" },
  { label: "Offer", status: "offer" },
];

function ApplicationTracker({ userJobs }: ApplicationTrackerProps) {
  return (
    <div>
      <p className="text-xl font-bold">Application Tracker</p>

      <div className="flex gap-4 my-5">
        {COLUMNS.map(({ label, status }) => {
          const jobs = userJobs.filter((j) => j.status === status);
          return (
            <div key={status} className="flex flex-col gap-3 w-full">
              <AppTrackerHeader header={`${label} (${jobs.length})`} />
              <div className="flex flex-col gap-3">
                {jobs.length === 0 ? (
                  <p className="text-xs text-gray-600 px-2 pt-1">No jobs yet</p>
                ) : (
                  jobs.map((job) => (
                    <DashboardJobCard
                      key={job.id}
                      userJobId={job.id}
                      company={job.jobs_listings?.company ?? "Unknown"}
                      role={job.jobs_listings?.job_title ?? "Unknown Role"}
                      location={job.jobs_listings?.location ?? ""}
                      roleType={job.jobs_listings?.role_type ?? ""}
                      status={job.status}
                      notes={job.notes ?? null}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApplicationTracker;
