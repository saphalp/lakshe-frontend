import DashBoardNav from "@/components/dashboard/DashBoardNav";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-40">
        <DashBoardNav />
        <SidebarProvider>
          <ProfileSidebar />
          <main className="w-full mx-auto font-sans text-white p-10">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
