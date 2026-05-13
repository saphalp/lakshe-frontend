"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

interface ExperienceFormCardProps {
  userId: string;
  existingExperiences: Experience[];
  onSaved: (updated: Experience[]) => void;
  onClose: () => void;
  initialData?: Experience;
  editIndex?: number;
}

function ExperienceFormCard({
  userId,
  existingExperiences,
  onSaved,
  onClose,
  initialData,
  editIndex,
}: ExperienceFormCardProps) {
  const isEditing = editIndex !== undefined;

  const [form, setForm] = useState<Experience>(
    initialData ?? {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.company && !form.role) return;
    setSaving(true);
    setError(null);

    const updated = isEditing
      ? existingExperiences.map((exp, i) => (i === editIndex ? form : exp))
      : [...existingExperiences, form];

    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ experiences: updated } as any)
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    onSaved(updated);
    onClose();
  };

  return (
    <Card className="mt-4">
      <CardContent className="text-gray-400 pt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white font-semibold text-lg">
            {isEditing ? "Edit Experience" : "Add Experience"}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="company" className="text-xs font-bold">
              COMPANY
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="e.g. Acme Corp"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role" className="text-xs font-bold">
              ROLE
            </Label>
            <Input
              id="role"
              name="role"
              placeholder="e.g. Software Engineer"
              value={form.role}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="startDate" className="text-xs font-bold">
                START DATE
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="endDate" className="text-xs font-bold">
                END DATE
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={form.endDate}
                onChange={handleChange}
                placeholder="Leave blank if current"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-xs font-bold">
              DESCRIPTION
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief summary of your responsibilities and achievements"
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || (!form.company && !form.role)}
              className="bg-indigo-700 hover:bg-indigo-600"
            >
              {saving ? "Saving..." : isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExperienceFormCard;
