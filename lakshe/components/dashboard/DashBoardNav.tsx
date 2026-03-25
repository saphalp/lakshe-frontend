"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Bell } from "lucide-react";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];
function DashBoardNav() {
  return (
    <>
      <nav className="flex justify-between py-4 px-40 font-sans text-white sticky items-center text-md">
        <Link href="/" className="font-bold  text-xl w-60">
          {" "}
          Lakshe{" "}
        </Link>
        <ul className="flex gap-3 items-center">
          <li>
            <Button variant="outline">
              <Bell />
            </Button>
          </li>
          <li>
            <Button variant="outline">
              <Settings />
            </Button>
          </li>
          <li>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-right font-bold">Saphal Pant</p>
                <p className="text-sm">saphalpant2003@gmail.com</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </li>
        </ul>
      </nav>
      <hr className="border-[oklch(55.4%_0.046_257.417)]" />
    </>
  );
}

export default DashBoardNav;
