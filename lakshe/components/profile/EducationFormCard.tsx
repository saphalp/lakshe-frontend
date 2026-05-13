"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
};

interface EducationFormCardProps {
  userId: string;
  existingEducations: Education[];
  onSaved: (updated: Education[]) => void;
  onClose: () => void;
  initialData?: Education;
  editIndex?: number;
}

function EducationFormCard({
  userId,
  existingEducations,
  onSaved,
  onClose,
  initialData,
  editIndex,
}: EducationFormCardProps) {
  const isEditing = editIndex !== undefined;

  const [form, setForm] = useState<Education>(
    initialData ?? {
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.institution && !form.degree) return;
    setSaving(true);
    setError(null);

    const updated = isEditing
      ? existingEducations.map((edu, i) => (i === editIndex ? form : edu))
      : [...existingEducations, form];

    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ education: updated } as any)
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
            {isEditing ? "Edit Education" : "Add Education"}
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
            <Label htmlFor="institution" className="text-xs font-bold">
              INSTITUTION
            </Label>
            <Input
              id="institution"
              name="institution"
              placeholder="e.g. MIT"
              value={form.institution}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="degree" className="text-xs font-bold">
              DEGREE
            </Label>
            <Input
              id="degree"
              name="degree"
              placeholder="e.g. Bachelor of Science"
              value={form.degree}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="field" className="text-xs font-bold">
              FIELD OF STUDY
            </Label>
            <Input
              id="field"
              name="field"
              placeholder="e.g. Computer Science"
              value={form.field}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="startYear" className="text-xs font-bold">
                START YEAR
              </Label>
              <Input
                id="startYear"
                name="startYear"
                placeholder="2018"
                value={form.startYear}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="endYear" className="text-xs font-bold">
                END YEAR
              </Label>
              <Input
                id="endYear"
                name="endYear"
                placeholder="2022"
                value={form.endYear}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || (!form.institution && !form.degree)}
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

export default EducationFormCard;
