"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

interface NotesModalProps {
  userJobId: number;
  initialNotes: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotesModal({ userJobId, initialNotes, open, onOpenChange }: NotesModalProps) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.from("user_jobs").update({ notes } as any).eq("id", userJobId);
    setSaving(false);
    onOpenChange(false);
    router.refresh();
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) setNotes(initialNotes ?? "");
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Job Notes</DialogTitle>
        </DialogHeader>
        <Textarea
          className="min-h-[140px] resize-none"
          placeholder="Add notes about this job..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
