"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building2, Users, Globe, FileText, Bookmark } from "lucide-react";
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
  const parts = raw.replace(/^\[|\]$/g, "").split(",").map((p) => p.replace(/['"]/g, "").trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const [currency, min, max] = parts;
  if (min && max) return `${currency} ${min} - ${max}`;
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
    <div className="border border-gray-700 rounded-xl p-5 hover:border-gray-500 transition-all bg-transparent group cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-300">
            {job.company.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base group-hover:text-indigo-300 transition-colors truncate">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
              <Building2 size={13} />
              {job.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {job.roleType && (
            <Badge className="text-xs bg-gray-800 text-gray-400 border border-gray-600 font-normal">
              {job.roleType}
            </Badge>
          )}
          {job.platform && (
            <Badge className="text-xs bg-gray-800 text-gray-400 border border-gray-600 font-normal">
              <Globe size={10} className="mr-1" />
              {job.platform}
            </Badge>
          )}
          <button
            onClick={handleBookmark}
            disabled={saving || !profileId}
            className="ml-1 text-gray-500 hover:text-white transition-colors disabled:opacity-40"
            aria-label={saved ? "Unsave job" : "Save job"}
          >
            <Bookmark
              size={17}
              className={saved ? "fill-indigo-400 text-indigo-400" : ""}
            />
          </button>
        </div>
      </div>

      {job.description && (
        <p className="text-sm text-gray-400 mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 text-xs text-gray-400">
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {job.location}
          </span>
        )}
        {formattedSalary && (
          <span className="flex items-center gap-1">
            <DollarSign size={12} />
            {formattedSalary}
          </span>
        )}
{job.applicantCount && (
          <span className="flex items-center gap-1">
            <Users size={12} />
            {job.applicantCount} applicants
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-gray-700">
        <Button
          size="default"
          variant="outline"
          className="text-xs h-8 px-3 border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white whitespace-nowrap"
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
          className="text-xs h-8 px-4 bg-indigo-600 hover:bg-indigo-700 border-0"
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
