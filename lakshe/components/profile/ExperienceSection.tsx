import React from "react";
import InfoDisplayCard from "@/components/profile/ExperienceDisplayCard";
import SectionHeader from "@/components/profile/SectionHeader";

const experiences = [
  {
    company: "Google",
    role: "Senior Software Engineer",
    startDate: "Jan 2021",
    endDate: "Present",
    description:
      "Led development of core search infrastructure, improving query response time by 40%. Collaborated with cross-functional teams to ship features used by millions of users daily.",
  },
  {
    company: "Meta",
    role: "Frontend Engineer",
    startDate: "Jun 2018",
    endDate: "Dec 2020",
    description:
      "Built and maintained React components for the Facebook News Feed. Improved page load performance by 25% through code splitting and lazy loading strategies.",
  },
  {
    company: "Amazon",
    role: "Full Stack Developer",
    startDate: "Mar 2016",
    endDate: "May 2018",
    description:
      "Developed internal tools for the logistics team using Node.js and React. Designed RESTful APIs consumed by mobile and web clients across multiple regions.",
  },
  {
    company: "Spotify",
    role: "Junior Developer",
    startDate: "Aug 2014",
    endDate: "Feb 2016",
    description:
      "Assisted in building playlist recommendation features using Python and Django. Wrote unit tests and participated in agile sprint planning and code reviews.",
  },
];

function ExperienceSection() {
  return (
    <>
      <SectionHeader
        section="Experience"
        description="Add your professional work history to stand out to recriters and increase your match score by up to 45%"
      />
      <div className="flex flex-col gap-5 my-8">
        {experiences.map((experience, index) => (
          <InfoDisplayCard key={index} experience={experience} />
        ))}
      </div>
    </>
  );
}

export default ExperienceSection;
