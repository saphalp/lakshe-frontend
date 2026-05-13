"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Education } from "./types";

const EMPTY: Education = {
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
};

interface InlineFormProps {
  form: Education;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isAdding: boolean;
}

function InlineEduForm({ form, onChange, onSave, onCancel, isAdding }: InlineFormProps) {
  return (
    <div className="rounded-md border border-gray-600 p-3 flex flex-col gap-3 bg-gray-800/40 mt-1">
      <div>
        <Label className="text-[10px] font-bold text-gray-400 tracking-wider">INSTITUTION</Label>
        <Input
          name="institution"
          value={form.institution}
          onChange={onChange}
          placeholder="e.g. MIT"
          className="mt-1 h-8 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">DEGREE</Label>
          <Input
            name="degree"
            value={form.degree}
            onChange={onChange}
            placeholder="e.g. Bachelor of Science"
            className="mt-1 h-8 text-sm"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">FIELD</Label>
          <Input
            name="field"
            value={form.field}
            onChange={onChange}
            placeholder="e.g. Computer Science"
            className="mt-1 h-8 text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">START YEAR</Label>
          <Input
            name="startYear"
            value={form.startYear}
            onChange={onChange}
            placeholder="2018"
            className="mt-1 h-8 text-sm"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">END YEAR</Label>
          <Input
            name="endYear"
            value={form.endYear}
            onChange={onChange}
            placeholder="2022"
            className="mt-1 h-8 text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onCancel}
          className="h-7 text-xs text-gray-400 hover:text-white px-3"
        >
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onSave}
          disabled={!form.institution && !form.degree}
          className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 px-4"
        >
          {isAdding ? "Add" : "Save"}
        </Button>
      </div>
    </div>
  );
}

interface Props {
  education: Education[];
  onChange: (updated: Education[]) => void;
}

export function ResumeEducationEditor({ education, onChange }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Education>(EMPTY);

  const startEdit = (index: number) => {
    setIsAdding(false);
    setEditingIndex(index);
    setForm(education[index]);
  };

  const startAdd = () => {
    setEditingIndex(null);
    setIsAdding(true);
    setForm(EMPTY);
  };

  const cancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
    setForm(EMPTY);
  };

  const save = () => {
    if (isAdding) {
      onChange([...education, form]);
    } else if (editingIndex !== null) {
      onChange(education.map((e, i) => (i === editingIndex ? form : e)));
    }
    cancel();
  };

  const remove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
    if (editingIndex === index) cancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {education.map((edu, i) => (
        <div key={i}>
          {editingIndex !== i ? (
            <div className="flex items-start justify-between rounded-md px-3 py-2.5 bg-gray-800/50 gap-2 group hover:bg-gray-800/80 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}
                </p>
                <p className="text-xs text-gray-400">
                  {edu.institution}
                  {edu.startYear && ` · ${edu.startYear} – ${edu.endYear}`}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
                <button
                  type="button"
                  onClick={() => startEdit(i)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ) : (
            <InlineEduForm
              form={form}
              onChange={handleChange}
              onSave={save}
              onCancel={cancel}
              isAdding={false}
            />
          )}
        </div>
      ))}

      {isAdding && (
        <InlineEduForm
          form={form}
          onChange={handleChange}
          onSave={save}
          onCancel={cancel}
          isAdding={true}
        />
      )}

      {!isAdding && (
        <button
          type="button"
          onClick={startAdd}
          className="flex items-center justify-center gap-1.5 w-full mt-1 py-2 rounded-md border border-dashed border-gray-600 text-xs text-gray-400 hover:border-gray-400 hover:text-white transition-colors"
        >
          <Plus size={13} />
          Add Education
        </button>
      )}
    </div>
  );
}
