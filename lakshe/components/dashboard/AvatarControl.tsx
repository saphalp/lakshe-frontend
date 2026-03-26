"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

function AvatarControl() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const handleLogOut = () => {
    supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-sm text-right font-bold">Saphal Pant</p>
        <p className="text-sm">saphalpant2003@gmail.com</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Your Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AvatarControl;
