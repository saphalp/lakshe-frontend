import type { ResumeData } from "./types";

export const MOCK_RESUME: ResumeData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  headline:
    "Full-Stack Software Engineer specializing in React, Node.js, and cloud-native systems. Passionate about building scalable, high-impact products that reach millions of users.",
  linkedin: "linkedin.com/in/alexjohnson",
  github: "github.com/alexjohnson",
  experiences: [
    {
      company: "Stripe",
      role: "Software Engineer II",
      startDate: "2022-03",
      endDate: "",
      description:
        "Built and maintained high-throughput payment APIs handling 2M+ daily transactions.\nLed migration from REST to GraphQL, reducing over-fetching by 40% and improving client performance.\nMentored 2 junior engineers and drove quarterly OKR planning across the payments platform team.",
    },
    {
      company: "Atlassian",
      role: "Software Engineer",
      startDate: "2020-06",
      endDate: "2022-02",
      description:
        "Developed core features in Jira Software using React and TypeScript, serving 10M+ users.\nImproved test coverage from 45% to 88% by introducing comprehensive unit and integration test suites.\nCollaborated with product and design teams to ship 3 major roadmap features on schedule.",
    },
    {
      company: "Vercel",
      role: "Software Engineering Intern",
      startDate: "2020-01",
      endDate: "2020-05",
      description:
        "Contributed to the Next.js open-source framework, fixing 12 reported issues during the internship.\nBuilt an internal tooling dashboard used daily by the developer experience team.",
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startYear: "2016",
      endYear: "2020",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Python",
  ],
};
