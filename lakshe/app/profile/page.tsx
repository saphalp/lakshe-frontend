import InfoDisplayCard from "@/components/profile/InfoDisplayCard";
import SectionHeader from "@/components/profile/SectionHeader";
import React from "react";

function page() {
  return (
    <div>
      <SectionHeader
        section="Experience"
        description="Add your professional work history to stand out to recriters and increase your match score by up to 45%"
      />
      <div className="flex flex-col gap-5 my-8">
        <InfoDisplayCard />
        <InfoDisplayCard />
        <InfoDisplayCard />
      </div>
    </div>
  );
}

export default page;
