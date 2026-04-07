import React from "react";
import GreetingCard from "@/components/dashboard/GreetingCard";
import StatsSection from "@/components/dashboard/StatsSection";
import ApplicationTracker from "@/components/dashboard/ApplicationTracker";
import LogoutButton from "@/components/dashboard/LogoutButton";

function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-40 my-15">
      <div className="col-span-4 text-white flex flex-col gap-6">
        <GreetingCard />
        <div>
          <StatsSection />
        </div>
        <ApplicationTracker />
      </div>
    </div>
  );
}

export default page;
