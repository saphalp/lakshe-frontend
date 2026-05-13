export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
};

export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  linkedin: string;
  github: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
};

export type JobListing = {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  roleType: string;
  description: string;
  applicantCount: string;
  platform: string;
  applyLink: string;
  jobUrl: string;
};

export function formatResumeDate(s: string): string {
  if (!s) return "Present";
  if (s.toLowerCase() === "present") return "Present";
  const m = s.match(/^(\d{4})-(\d{2})$/);
  if (m) {
    const d = new Date(parseInt(m[1]), parseInt(m[2]) - 1);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  return s;
}
