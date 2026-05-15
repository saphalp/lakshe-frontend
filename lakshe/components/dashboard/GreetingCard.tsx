import React from "react";
import { Button } from "../ui/button";
import { Pencil, Search } from "lucide-react";
import Link from "next/link";

function GreetingCard() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
          Welcome back, Saphal
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          You have{" "}
          <span className="text-primary font-medium">3 new job matches</span>{" "}
          based on your profile.
        </p>
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <Link href="/explore-jobs">
          <Button className="gap-2">
            <Search className="w-4 h-4" />
            Find Jobs
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="outline" className="gap-2 border-border bg-transparent hover:bg-secondary">
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Update Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default GreetingCard;
