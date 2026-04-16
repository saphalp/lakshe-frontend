"use client";

import React, { useState, useEffect } from "react";
import InfoDisplayCard from "@/components/profile/ExperienceDisplayCard";
import SectionHeader from "@/components/profile/SectionHeader";
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

  return (
    <>
      <SectionHeader
        section="Experience"
        description="Add your professional work history to stand out to recruiters and increase your match score by up to 45%"
        buttonText="Add Experience"
      />
      <div className="flex flex-col gap-5 my-8">
        {experiences.map((experience, index) => (
          <InfoDisplayCard key={index} experience={experience} />
        ))}
      </div>
    </>
  );
}

export default ExperienceSection;
