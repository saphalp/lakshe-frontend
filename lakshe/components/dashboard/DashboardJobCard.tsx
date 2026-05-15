"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { JobDropdownMenu } from "./JobDropdownMenu";
import { NotesModal } from "./NotesModal";
import { Pencil } from "lucide-react";

interface JobCardProps {
  userJobId: number;
  company: string;
  role: string;
  location: string;
  roleType: string;
  status: string;
  notes: string | null;
}

const NOTES_PREVIEW_WORDS = 8;

function truncateNotes(notes: string | null): string | null {
  if (!notes?.trim()) return null;
  const words = notes.trim().split(/\s+/);
  if (words.length <= NOTES_PREVIEW_WORDS) return notes.trim();
  return words.slice(0, NOTES_PREVIEW_WORDS).join(" ") + "…";
}

function DashboardJobCard({
  userJobId,
  company,
  role,
  location,
  roleType,
  status,
  notes,
}: JobCardProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const preview = truncateNotes(notes);

  return (
    <>
      <div className="bg-card border border-border flex flex-col p-4 rounded-xl gap-3 justify-between hover:border-border/80 transition-colors">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-start gap-2">
            <p className="font-semibold text-foreground text-sm leading-snug">
              {company}
            </p>
            <JobDropdownMenu userJobId={userJobId} status={status} />
          </div>
          <p className="text-xs text-muted-foreground">{role}</p>
          {location && (
            <p className="text-xs text-muted-foreground/70">{location}</p>
          )}
          {preview && (
            <p className="text-xs text-muted-foreground/60 italic leading-snug line-clamp-2">
              {preview}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center pt-1">
          {roleType && (
            <Badge
              variant="secondary"
              className="text-xs bg-secondary text-muted-foreground border-border"
            >
              {roleType}
            </Badge>
          )}
          <button
            onClick={() => setNotesOpen(true)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            aria-label="Edit notes"
          >
            <Pencil size={13} />
          </button>
        </div>
      </div>
      <NotesModal
        userJobId={userJobId}
        initialNotes={notes}
        open={notesOpen}
        onOpenChange={setNotesOpen}
      />
    </>
  );
}

export default DashboardJobCard;
