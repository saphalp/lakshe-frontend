import React from "react";
import Link from "next/link";
import { Globe, Instagram, Twitter } from "lucide-react";

const nav = {
  Platform: ["Resume Builder", "Interview Prep", "Job Matching"],
  Resources: ["Blog", "Careers", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function Footer() {
  return (
    <footer className="px-4 md:px-8 lg:px-20 mt-20 lg:mt-32">
      <hr className="border-border mb-10" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="flex flex-col gap-5 w-full lg:w-1/3">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Lakshe
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            AI-powered platform to navigate the modern job market with precision
            and speed.
          </p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-2/3 gap-10 sm:gap-16 lg:justify-end">
          {Object.entries(nav).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-foreground">{section}</p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-muted-foreground text-sm hover:text-foreground cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border my-8" />
      <div className="flex flex-col sm:flex-row justify-between mb-10 text-muted-foreground text-xs gap-3">
        <p>© 2026 Lakshe.co · All rights reserved.</p>
        <p>English (US)</p>
      </div>
    </footer>
  );
}

export default Footer;
