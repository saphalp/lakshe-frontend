"use client";

import React, { useState } from "react";
import { useStep } from "@/context/StepContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "./card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { X } from "lucide-react";
import { useFormData } from "@/context/FormContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type ExperiencesEntry = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Inputs = {
  experiences: ExperiencesEntry[];
};

export default function ExperienceForm() {
  const [status, setStatus] = useState<string>();
  const supabase = getSupabaseBrowserClient();
  const { formData, updateFormData } = useFormData();
  const { prevStep } = useStep();
  const [experiences, setExperiences] = useState<ExperiencesEntry[]>(
    formData.experiences,
  );

  const [form, setForm] = useState<ExperiencesEntry>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      experiences: formData.experiences,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!formData.email || !formData.password) {
      setStatus("Missing account credentials. Please go back and try again.");
      return;
    }

    const finalExperiences =
      form.company || form.role
        ? [...data.experiences, form]
        : data.experiences;

    // 1. Sign up
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (signUpError || !authData.user) {
      setStatus(signUpError?.message ?? "Sign up failed.");
      return;
    }
    const { error: insertError } = await (supabase as any)
      .from("profiles")
      .insert({
        id: authData.user.id,
        email: formData.email,
        experiences: finalExperiences,
        education: formData.education,
      });

    if (insertError) {
      setStatus(insertError.message);
      return;
    }

    setStatus("Please check your inbox for the activation link.");
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!form.company && !form.role) return;
    const updated = [...experiences, form];
    setExperiences(updated);
    setValue("experiences", updated);
    setForm({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    updateFormData({ experiences: updated });
  };

  const removeExperience = (experience: ExperiencesEntry) => {
    const updated = experiences.filter((s) => s !== experience);
    setExperiences(updated);
    setValue("experiences", updated);
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        {experiences.map((item, index) => (
          <Item variant="default" className="bg-card" key={index}>
            <ItemContent>
              <ItemTitle>{item.company}</ItemTitle>
              <ItemDescription>
                {item.role} - ({item.description}) {item.startDate}-
                {item.endDate}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <button
                type="button"
                onClick={() => removeExperience(item)}
                className="hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </ItemActions>
          </Item>
        ))}
      </div>
      <Card>
        <CardContent className="text-gray-400">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
                  className="color-gray-400"
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
            {status && <p className={`text-sm text-red-400`}>{status}</p>}
            <div className="flex justify-between mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="w-30 bg-transparent"
              >
                Back
              </Button>
              <div>
                <Button
                  onClick={handleAdd}
                  type="button"
                  className="w-30 bg-indigo-700 mr-3"
                >
                  Add
                </Button>
                <Button type="submit" className="w-30">
                  Finish
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
