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

function DashboardJobCard({ userJobId, company, role, location, roleType, status, notes }: JobCardProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const preview = truncateNotes(notes);

  return (
    <>
      <div className="bg-card flex flex-col p-4 rounded-lg gap-3 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <p className="font-bold text-sm">{company}</p>
            <JobDropdownMenu userJobId={userJobId} status={status} />
          </div>
          <p className="text-sm text-muted">{role}</p>
          {location && <p className="text-xs text-gray-400">{location}</p>}
          {preview && (
            <p className="text-xs text-gray-500 italic leading-snug">{preview}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          {roleType && <Badge variant="default">{roleType}</Badge>}
          <button
            onClick={() => setNotesOpen(true)}
            className="ml-auto text-gray-400 hover:text-white transition-colors"
            aria-label="Edit notes"
          >
            <Pencil size={14} />
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
