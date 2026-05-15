"use client";
import React from "react";
import Link from "next/link";
import AvatarControl from "./AvatarControl";
import NotificiationsDropdown from "./NotificiationsDropdown";

function DashBoardNav() {
  return (
    <>
      <nav className="flex justify-between py-4 px-4 md:px-8 lg:px-12 sticky top-0 z-50 items-center bg-background/80 backdrop-blur-sm">
        <Link href="/" className="font-bold text-foreground text-xl">
          Lakshe
        </Link>
        <ul className="flex gap-3 items-center">
          <li>
            <NotificiationsDropdown />
          </li>
          <li>
            <AvatarControl />
          </li>
        </ul>
      </nav>
      <hr className="border-border" />
    </>
  );
}

export default DashBoardNav;
