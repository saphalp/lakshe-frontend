"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { SidebarProgressChart } from "./SidebarProgressChart";
import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  User,
  Wrench,
} from "lucide-react";

interface ProfileSidebarProps {
  onSectionChange: (section: string) => void;
}

function ProfileSidebar({ onSectionChange }: ProfileSidebarProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSectionChange(e.currentTarget.dataset.value ?? "personal-info");
  };

  return (
    <Sidebar
      collapsible="none"
      className="text-white py-4 pr-4 border-r border-gray-400"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarProgressChart />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-4 gap-4 text-gray-400">
          <SidebarMenuButton data-value="personal-info" onClick={handleClick}>
            <User />
            Personal Info
          </SidebarMenuButton>
          <SidebarMenuButton data-value="experiences" onClick={handleClick}>
            <Briefcase />
            Work Experience
          </SidebarMenuButton>
          <SidebarMenuButton data-value="education" onClick={handleClick}>
            <GraduationCap />
            Education
          </SidebarMenuButton>
          <SidebarMenuButton data-value="skills" onClick={handleClick}>
            <Wrench />
            Skills
          </SidebarMenuButton>
          <SidebarMenuButton data-value="projects" onClick={handleClick}>
            <FolderGit2 />
            Projects
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default ProfileSidebar;
