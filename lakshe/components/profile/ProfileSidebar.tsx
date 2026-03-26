import React from "react";
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
import { Briefcase, GraduationCap, User, Wrench } from "lucide-react";

function ProfileSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="text-white p-4 border-r border-gray-400"
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
          <SidebarMenuButton>
            <User />
            Personal Info
          </SidebarMenuButton>
          <SidebarMenuButton>
            <Briefcase />
            Work Experience
          </SidebarMenuButton>
          <SidebarMenuButton>
            <GraduationCap />
            Education
          </SidebarMenuButton>
          <SidebarMenuButton>
            <Wrench />
            Skills
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default ProfileSidebar;
