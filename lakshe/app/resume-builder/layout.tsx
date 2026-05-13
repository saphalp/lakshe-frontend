import DashBoardNav from "@/components/dashboard/DashBoardNav";
import React from "react";

export default function ResumeBuilderPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashBoardNav />
      <main className="w-full font-sans">{children}</main>
    </>
  );
}
