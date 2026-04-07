"use client";

import DashBoardNav from "@/components/dashboard/DashBoardNav";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ExperienceSection from "@/components/profile/ExperienceSection";
import EducationSection from "@/components/profile/EducationSection";
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PersonalInfoSection from "@/components/profile/PersonalInfoSection";
import ProfileSkillsForm from "@/components/profile/ProfileSkillsForm";

export default function Layout() {
  const [section, setSection] = useState("personal-info");

  const renderSection = () => {
    switch (section) {
      case "personal-info":
        return <PersonalInfoSection />;
      case "work-experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      case "skills":
        return <ProfileSkillsForm/>;
      default:
        return <ExperienceSection />;
    }
  };

  return (
    <>
      <DashBoardNav />
      <SidebarProvider>
        <div className="flex w-full px-40">
          <ProfileSidebar onSectionChange={setSection} />
          <main className="w-full mx-auto font-sans text-white p-10">
            {renderSection()}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
