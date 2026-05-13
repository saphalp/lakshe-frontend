import GreetingCard from "@/components/dashboard/GreetingCard";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import React from "react";
import StatsSection from "@/components/dashboard/StatsSection";
import ApplicationTracker from "@/components/dashboard/ApplicationTracker";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const [{ data: userJobs }, { count: resumeCount }] = await Promise.all([
    profile
      ? supabase
          .from("user_jobs")
          .select("id, status, job_id, notes, jobs_listings(job_title, company, location, role_type)")
          .eq("profile_id", profile.id)
      : Promise.resolve({ data: [] }),

    supabase
      .from("resumes")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "done"),
  ]);

  const jobs = userJobs ?? [];

  const stats = {
    saved:             jobs.filter((j: any) => j.status === "saved").length,
    applied:           jobs.filter((j: any) => j.status === "applied").length,
    interviews:        jobs.filter((j: any) => j.status === "interview").length,
    resumesGenerated:  resumeCount ?? 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-40 my-15">
      <div className="col-span-4 text-white flex flex-col gap-6">
        <GreetingCard />
        <StatsSection {...stats} />
        <ApplicationTracker userJobs={jobs as any} />
      </div>
    </div>
  );
}
