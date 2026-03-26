"use client";
import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Settings } from "lucide-react";
import AvatarControl from "./AvatarControl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificiationsDropdown from "./NotificiationsDropdown";

function DashBoardNav() {
  return (
    <>
      <nav className="flex justify-between py-4 px-40 font-sans text-white sticky items-center text-md">
        <Link href="/" className="font-bold  text-xl w-60">
          {" "}
          Lakshe{" "}
        </Link>
        <ul className="flex gap-5 items-end">
          <li>
            <NotificiationsDropdown />
          </li>
          <li>
            <AvatarControl />
          </li>
        </ul>
      </nav>
      <hr className="border-[oklch(55.4%_0.046_257.417)]" />
    </>
  );
}

export default DashBoardNav;
