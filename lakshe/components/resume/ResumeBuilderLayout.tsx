"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import type { ResumeData, Experience, Education, JobListing } from "./types";
import { ResumePreview } from "./ResumePreview";
import { ResumeExperienceEditor } from "./ResumeExperienceEditor";
import { ResumeEducationEditor } from "./ResumeEducationEditor";
import { ResumeSkillsEditor } from "./ResumeSkillsEditor";
import { ResumePromptSection } from "./ResumePromptSection";
import { ResumeStatusOverlay, type ResumeStatus } from "./ResumeStatusOverlay";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

const A4_W = 794;
const A4_H = 1123;

const WEBHOOK_URL =
  "https://n8n.saphalpant.com/webhook/26d63a60-56a8-476a-886e-0313898cfee3";

interface Props {
  jobId: string | null;
  jobTitle: string;
  company: string;
  initialData: ResumeData;
  jobData: JobListing | null;
  userId: string;
}

function EditorSection({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
        <span className="text-xs font-bold text-white tracking-wide uppercase">
          {title}
        </span>
        {count !== undefined && (
          <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded-full font-medium">
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function ResumeBuilderLayout({
  jobId,
  jobTitle,
  company,
  initialData,
  jobData,
  userId,
}: Props) {
  const [resumeData, setResumeData]     = useState<ResumeData>(initialData);
  const [resumeStatus, setResumeStatus] = useState<ResumeStatus>(null);
  const [prompt, setPrompt]             = useState("");
  const [downloading, setDownloading]   = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // ── Realtime subscription + initial state check ────────────────────────────
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    // If there is no job context, skip generation and go straight to editor
    if (!jobId) {
      setResumeStatus("done");
      return;
    }

    const numJobId = Number(jobId);

    // Check whether a resume already exists for this user+job.
    // Only fire the webhook when there is no record yet (or the last one failed).
    const fetchExisting = async () => {
      const { data } = await supabase
        .from("resumes")
        .select("status, data")
        .eq("user_id", userId)
        .eq("job_id", numJobId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle() as { data: { status: string; data: ResumeData | null } | null };

      if (data) {
        setResumeStatus(data.status as ResumeStatus);
        if (data.status === "done" && data.data) {
          setResumeData(data.data);
        }
        // Resume is pending / processing / done — no need to re-trigger
        if (data.status !== "failed") return;
      }

      // No record found, or previous attempt failed — trigger generation
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          profile: initialData,
          job: jobData ?? { jobTitle, company },
          prompt,
        }),
      }).catch(console.error);
    };

    fetchExisting();

    // Subscribe to INSERT / UPDATE on this user's rows
    const channel = supabase
      .channel(`resume-${userId}-${jobId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "resumes",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row = payload.new as {
            status: string;
            data: ResumeData | null;
            job_id: number;
          };

          // Only handle updates for the current job
          if (row.job_id !== numJobId) return;

          setResumeStatus(row.status as ResumeStatus);
          if (row.status === "done" && row.data) {
            setResumeData(row.data as ResumeData);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, jobId]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const setExperiences = (experiences: Experience[]) =>
    setResumeData((prev) => ({ ...prev, experiences }));
  const setEducation = (education: Education[]) =>
    setResumeData((prev) => ({ ...prev, education }));
  const setSkills = (skills: string[]) =>
    setResumeData((prev) => ({ ...prev, skills }));

  const handleRegenerate = async () => {
    if (regenerating) return;
    setRegenerating(true);
    // Reset to pending so the status overlay re-appears while AI re-runs
    setResumeStatus("pending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          profile: resumeData,
          job: jobData ?? { jobTitle, company },
          prompt,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setRegenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng }        = await import("html-to-image");
      const { default: jsPDF } = await import("jspdf");

      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const img = await new Promise<HTMLImageElement>((resolve) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.src = dataUrl;
      });

      const imgHeightInPdf = img.naturalHeight / 2;
      const totalPages     = Math.ceil(imgHeightInPdf / A4_H);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [A4_W, A4_H],
      });

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, -page * A4_H, A4_W, imgHeightInPdf);
      }

      const filename = resumeData.name
        ? `${resumeData.name.toLowerCase().replace(/\s+/g, "_")}_resume.pdf`
        : "resume.pdf";
      pdf.save(filename);
    } finally {
      setDownloading(false);
    }
  };

  // ── Status overlay (shown while AI is generating) ─────────────────────────
  if (resumeStatus !== "done") {
    return (
      <div className="h-[calc(100vh-73px)] flex items-center justify-center px-20">
        <ResumeStatusOverlay
          status={resumeStatus}
          jobTitle={jobTitle}
          company={company}
          onRegenerate={resumeStatus === "failed" ? handleRegenerate : undefined}
        />
      </div>
    );
  }

  // ── Two-panel editor (shown once AI is done) ───────────────────────────────
  return (
    <div className="grid grid-cols-5 h-[calc(100vh-73px)] overflow-hidden text-white px-20">
      {/* ── Left panel — Editor ── */}
      <div className="col-span-2 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Job context banner */}
          {(jobTitle || company) && (
            <div className="flex items-start gap-2.5 mb-6 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Briefcase size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">Tailoring resume for</p>
                <p className="text-sm font-semibold text-white truncate">
                  {jobTitle || "This Position"}
                </p>
                {company && <p className="text-xs text-gray-400">{company}</p>}
              </div>
            </div>
          )}

          <EditorSection title="Experience" count={resumeData.experiences.length}>
            <ResumeExperienceEditor
              experiences={resumeData.experiences}
              onChange={setExperiences}
            />
          </EditorSection>

          <EditorSection title="Education" count={resumeData.education.length}>
            <ResumeEducationEditor
              education={resumeData.education}
              onChange={setEducation}
            />
          </EditorSection>

          <EditorSection title="Skills" count={resumeData.skills.length}>
            <ResumeSkillsEditor
              skills={resumeData.skills}
              onChange={setSkills}
            />
          </EditorSection>

          <div className="h-px bg-gray-800 mb-6" />

          <ResumePromptSection
            prompt={prompt}
            onPromptChange={setPrompt}
            onDownload={handleDownload}
            downloading={downloading}
            onRegenerate={handleRegenerate}
            regenerating={regenerating}
          />
        </div>
      </div>

      {/* ── Right panel — Preview ── */}
      <div className="col-span-3 overflow-y-auto overflow-x-auto bg-background">
        <div className="p-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">Resume Preview</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Changes on the left reflect here in real time
            </p>
          </div>
          <ResumePreview ref={previewRef} data={resumeData} />
        </div>
      </div>
    </div>
  );
}
