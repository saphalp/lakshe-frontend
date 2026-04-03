import React from "react";
import InfoDisplayCard from "@/components/profile/ExperienceDisplayCard";
import SectionHeader from "@/components/profile/SectionHeader";
import EducationDisplayCard from "./EducationDisplayCard";

const educationList = [
  {
    institution: "Massachusetts Institute of Technology",
    degree: "Bachelor of Science",
    major: "Computer Science",
    startDate: "Sep 2010",
    endDate: "Jun 2014",
    gpa: 3.8,
  },
  {
    institution: "Stanford University",
    degree: "Master of Science",
    major: "Artificial Intelligence",
    startDate: "Sep 2014",
    endDate: "Jun 2016",
    gpa: 3.9,
  },
];

function EducationSection() {
  return (
    <>
      <SectionHeader
        section="Education"
        description="Add your professional work history to stand out to recriters and increase your match score by up to 45%"
      />
      <div className="flex flex-col gap-5 my-8">
        {educationList.map((education, index) => (
          <EducationDisplayCard education={education} />
        ))}
      </div>
    </>
  );
}

export default EducationSection;
