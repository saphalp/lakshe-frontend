import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface headerProps {
  section: string;
  description: string;
}

function SectionHeader({ section, description }: headerProps) {
  return (
    <div className="flex text-white flex-col gap-4 w-fullp px-5">
      <p className="text-3xl font-extrabold">{section}</p>
      <div className="flex justify-between">
        <p className="text-gray-400 text-md w-1/2">{description}</p>
        <Button>
          <Plus /> Add {section}
        </Button>
      </div>
    </div>
  );
}

export default SectionHeader;
