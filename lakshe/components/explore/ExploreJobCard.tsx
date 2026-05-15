"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  DollarSign,
  Building2,
  Users,
  Globe,
  FileText,
  Bookmark,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export interface Job {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  roleType: string;
  postedAt: string;
  description: string;
  applicantCount: string;
  expiresAt: string;
  companyAddress: string;
  applyLink: string;
  platform: string;
  jobUrl: string;
}

interface ExploreJobCardProps {
  job: Job;
  profileId: string | null;
}

function formatSalary(raw: string): string | null {
  if (!raw) return null;
  const parts = raw
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((p) => p.replace(/['"]/g, "").trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  const [currency, min, max] = parts;
  if (min && max) return `${currency} ${min} – ${max}`;
  return parts.join(" ");
}

function ExploreJobCard({ job, profileId }: ExploreJobCardProps) {
  const formattedSalary = formatSalary(job.salary);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!profileId || saving) return;
    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    if (!saved) {
      await supabase.from("user_jobs").insert({
        profile_id: profileId,
        job_id: Number(job.id),
        status: "saved",
      });
    } else {
      await supabase
        .from("user_jobs")
        .delete()
        .eq("profile_id", profileId)
        .eq("job_id", Number(job.id));
    }
    setSaved((s) => !s);
    setSaving(false);
  };

  return (
    <div className="border border-border rounded-xl p-5 bg-card hover:border-brand/40 transition-all group cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground">
            {job.company.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors truncate">
              {job.jobTitle}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 size={12} />
              {job.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {job.roleType && (
            <Badge className="text-xs bg-secondary text-muted-foreground border-border font-normal hidden sm:flex">
              {job.roleType}
            </Badge>
          )}
          {job.platform && (
            <Badge className="text-xs bg-secondary text-muted-foreground border-border font-normal hidden md:flex">
              <Globe size={10} className="mr-1" />
              {job.platform}
            </Badge>
          )}
          <button
            onClick={handleBookmark}
            disabled={saving || !profileId}
            className="ml-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 p-1"
            aria-label={saved ? "Unsave job" : "Save job"}
          >
            <Bookmark
              size={16}
              className={saved ? "fill-primary text-primary" : ""}
            />
          </button>
        </div>
      </div>

      {job.description && (
        <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-muted-foreground">
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {job.location}
          </span>
        )}
        {formattedSalary && (
          <span className="flex items-center gap-1">
            <DollarSign size={11} />
            {formattedSalary}
          </span>
        )}
        {job.applicantCount && (
          <span className="flex items-center gap-1">
            <Users size={11} />
            {job.applicantCount} applicants
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-8 px-3 border-border text-muted-foreground bg-transparent hover:bg-secondary hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              `/resume-builder?jobId=${job.id}&jobTitle=${encodeURIComponent(job.jobTitle)}&company=${encodeURIComponent(job.company)}`
            );
          }}
        >
          <FileText size={12} className="mr-1.5" />
          Generate Resume
        </Button>
        <Button
          size="sm"
          className="text-xs h-8 px-4"
          onClick={(e) => {
            e.stopPropagation();
            const link = job.applyLink || job.jobUrl;
            if (link) window.open(link, "_blank", "noopener,noreferrer");
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default ExploreJobCard;
