import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import type { ResumeData, JobListing } from "@/components/resume/types";
import ResumeBuilderClient from "./ResumeBuilderClient";

export default async function ResumeBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string; jobTitle?: string; company?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/login");

  // Fetch profile and job listing in parallel
  const [{ data: profile }, { data: job }] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "f_name, l_name, email, phone, headline, linkedin_url, github_url, skills, experiences, education"
      )
      .eq("id", user.id)
      .single(),

    params.jobId
      ? supabase
          .from("jobs_listings")
          .select(
            "id, job_title, company, location, salary, role_type, description, applicant_count, platform, apply_link, job_url"
          )
          .eq("id", Number(params.jobId))
          .single()
      : Promise.resolve({ data: null }),
  ]);

  const initialData: ResumeData = {
    name: [profile?.f_name, profile?.l_name].filter(Boolean).join(" "),
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    location: "",
    headline: profile?.headline ?? "",
    linkedin: profile?.linkedin_url ?? "",
    github: profile?.github_url ?? "",
    experiences: Array.isArray(profile?.experiences) ? profile.experiences : [],
    education: Array.isArray(profile?.education) ? profile.education : [],
    skills: Array.isArray(profile?.skills) ? profile.skills : [],
  };

  const jobData: JobListing | null = job
    ? {
        id: job.id,
        jobTitle: job.job_title ?? "",
        company: job.company ?? "",
        location: job.location ?? "",
        salary: job.salary ?? "",
        roleType: job.role_type ?? "",
        description: job.description ?? "",
        applicantCount: job.applicant_count ?? "",
        platform: job.platform ?? "",
        applyLink: job.apply_link ?? "",
        jobUrl: job.job_url ?? "",
      }
    : null;

  return (
    <ResumeBuilderClient
      jobId={params.jobId ?? null}
      jobTitle={decodeURIComponent(params.jobTitle ?? "")}
      company={decodeURIComponent(params.company ?? "")}
      initialData={initialData}
      jobData={jobData}
      userId={user.id}
    />
  );
}
