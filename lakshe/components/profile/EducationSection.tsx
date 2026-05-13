"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/profile/SectionHeader";
import EducationDisplayCard from "./EducationDisplayCard";
import EducationFormCard from "@/components/profile/EducationFormCard";
import { useProfileUser } from "@/context/ProfileUserContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
};

function EducationSection() {
  const { userId } = useProfileUser();
  const [educations, setEducations] = useState<Education[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;

    const fetchEducations = async () => {
      const supabase = getSupabaseBrowserClient();

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("education")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.log("Error fetching educations:", error);
        return;
      }

      if (profile?.education) {
        setEducations(profile.education);
      }
    };

    fetchEducations();
  }, [userId]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index: number) => {
    if (!userId) return;
    const updated = educations.filter((_, i) => i !== index);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase
      .from("profiles")
      .update({ education: updated } as any)
      .eq("id", userId);
    if (!error) setEducations(updated);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditIndex(undefined);
  };

  return (
    <>
      <SectionHeader
        section="Education"
        description="Add your educational background to stand out to recruiters and increase your match score by up to 45%"
        buttonText="Add Education"
        onButtonClick={() => { setEditIndex(undefined); setShowForm(true); }}
      />
      {showForm && userId && (
        <EducationFormCard
          userId={userId}
          existingEducations={educations}
          onSaved={(updated) => setEducations(updated)}
          onClose={handleClose}
          initialData={editIndex !== undefined ? educations[editIndex] : undefined}
          editIndex={editIndex}
        />
      )}
      <div className="flex flex-col gap-5 my-8">
        {educations.map((education, index) => (
          <EducationDisplayCard
            key={index}
            education={education}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
}

export default EducationSection;
