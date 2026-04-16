"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/profile/SectionHeader";
import EducationDisplayCard from "./EducationDisplayCard";
import { useProfileUser } from "@/context/ProfileUserContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Education = {
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa: number;
};

function EducationSection() {
  const { userId } = useProfileUser();
  const [educations, setEducations] = useState<Education[]>([]);

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

  return (
    <>
      <SectionHeader
        section="Education"
        description="Add your educational background to stand out to recruiters and increase your match score by up to 45%"
        buttonText="Add Education"
      />
      <div className="flex flex-col gap-5 my-8">
        {educations.map((education, index) => (
          <EducationDisplayCard key={index} education={education} />
        ))}
      </div>
    </>
  );
}

export default EducationSection;
