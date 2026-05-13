"use client";

import dynamic from "next/dynamic";
import type { ResumeData, JobListing } from "@/components/resume/types";

const ResumeBuilderLayout = dynamic(
  () =>
    import("@/components/resume/ResumeBuilderLayout").then(
      (m) => m.ResumeBuilderLayout
    ),
  { ssr: false }
);

interface Props {
  jobId: string | null;
  jobTitle: string;
  company: string;
  initialData: ResumeData;
  jobData: JobListing | null;
  userId: string;
}

export default function ResumeBuilderClient(props: Props) {
  return <ResumeBuilderLayout {...props} />;
}
