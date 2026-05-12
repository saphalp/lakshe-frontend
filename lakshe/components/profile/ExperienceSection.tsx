"use client";

import React, { useState, useEffect } from "react";
import InfoDisplayCard from "@/components/profile/ExperienceDisplayCard";
import SectionHeader from "@/components/profile/SectionHeader";
import ExperienceFormCard from "@/components/profile/ExperienceFormCard";
import { useProfileUser } from "@/context/ProfileUserContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

function ExperienceSection() {
  const { userId } = useProfileUser();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;

    const fetchExperiences = async () => {
      const supabase = getSupabaseBrowserClient();

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("experiences")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching experiences:", error);
        return;
      }

      if (profile?.experiences) {
        setExperiences(profile.experiences);
      }
    };

    fetchExperiences();
  }, [userId]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index: number) => {
    if (!userId) return;
    const updated = experiences.filter((_, i) => i !== index);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase
      .from("profiles")
      .update({ experiences: updated })
      .eq("id", userId);
    if (!error) setExperiences(updated);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditIndex(undefined);
  };

  return (
    <>
      <SectionHeader
        section="Experience"
        description="Add your professional work history to stand out to recruiters and increase your match score by up to 45%"
        buttonText="Add Experience"
        onButtonClick={() => { setEditIndex(undefined); setShowForm(true); }}
      />
      {showForm && userId && (
        <ExperienceFormCard
          userId={userId}
          existingExperiences={experiences}
          onSaved={(updated) => setExperiences(updated)}
          onClose={handleClose}
          initialData={editIndex !== undefined ? experiences[editIndex] : undefined}
          editIndex={editIndex}
        />
      )}
      <div className="flex flex-col gap-5 my-8">
        {experiences.map((experience, index) => (
          <InfoDisplayCard
            key={index}
            experience={experience}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
}

export default ExperienceSection;
