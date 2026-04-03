import React from "react";
import { Button } from "../ui/button";
import { Pencil, Search } from "lucide-react";
import Link from "next/link";

function GreetingCard() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-4xl font-extrabold">Welcome, Saphal</p>
        <p className="text-md text-gray-400 my-2">
          {" "}
          You have <span className="text-indigo-700">
            3 new job matches
          </span>{" "}
          based on your profile
        </p>
      </div>
      <div className="flex gap-3">
        <Button className="p-5">
          <Search />
          Find Jobs
        </Button>
        <Link href="/profile">
          <Button variant="outline" className="p-5 bg-transparent">
            <Pencil />
            Update Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default GreetingCard;
