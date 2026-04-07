"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const handleLogOut = () => {
    supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div>
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
}

export default LogoutButton;
