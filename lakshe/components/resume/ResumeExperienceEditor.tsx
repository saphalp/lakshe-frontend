"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "./types";
import { formatResumeDate } from "./types";

const EMPTY: Experience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

interface InlineFormProps {
  form: Experience;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isAdding: boolean;
}

function InlineExpForm({ form, onChange, onSave, onCancel, isAdding }: InlineFormProps) {
  return (
    <div className="rounded-md border border-gray-600 p-3 flex flex-col gap-3 bg-gray-800/40 mt-1">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">COMPANY</Label>
          <Input
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder="e.g. Acme Corp"
            className="mt-1 h-8 text-sm"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">ROLE</Label>
          <Input
            name="role"
            value={form.role}
            onChange={onChange}
            placeholder="e.g. Software Engineer"
            className="mt-1 h-8 text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">START DATE</Label>
          <Input
            name="startDate"
            type="month"
            value={form.startDate}
            onChange={onChange}
            className="mt-1 h-8 text-sm"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] font-bold text-gray-400 tracking-wider">END DATE</Label>
          <Input
            name="endDate"
            type="month"
            value={form.endDate}
            onChange={onChange}
            className="mt-1 h-8 text-sm"
            placeholder="Leave blank if current"
          />
        </div>
      </div>
      <div>
        <Label className="text-[10px] font-bold text-gray-400 tracking-wider">DESCRIPTION</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Responsibilities and key achievements..."
          rows={3}
          className="mt-1 text-sm resize-none"
        />
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
          disabled={!form.company && !form.role}
          className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 px-4"
        >
          {isAdding ? "Add" : "Save"}
        </Button>
      </div>
    </div>
  );
}

interface Props {
  experiences: Experience[];
  onChange: (updated: Experience[]) => void;
}

export function ResumeExperienceEditor({ experiences, onChange }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Experience>(EMPTY);

  const startEdit = (index: number) => {
    setIsAdding(false);
    setEditingIndex(index);
    setForm(experiences[index]);
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
      onChange([...experiences, form]);
    } else if (editingIndex !== null) {
      onChange(experiences.map((e, i) => (i === editingIndex ? form : e)));
    }
    cancel();
  };

  const remove = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
    if (editingIndex === index) cancel();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {experiences.map((exp, i) => (
        <div key={i}>
          {editingIndex !== i ? (
            <div className="flex items-start justify-between rounded-md px-3 py-2.5 bg-gray-800/50 gap-2 group hover:bg-gray-800/80 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {exp.role || "Untitled Role"}
                </p>
                <p className="text-xs text-gray-400">
                  {exp.company}
                  {exp.startDate &&
                    ` · ${formatResumeDate(exp.startDate)} – ${formatResumeDate(exp.endDate)}`}
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
            <InlineExpForm
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
        <InlineExpForm
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
          Add Experience
        </button>
      )}
    </div>
  );
}
