import DashBoardNav from "@/components/dashboard/DashBoardNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashBoardNav />
      <main className="w-full mx-auto font-sans">{children}</main>
    </>
  );
}
