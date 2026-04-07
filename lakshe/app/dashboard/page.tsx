import GreetingCard from "@/components/dashboard/GreetingCard";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import React from "react";
import StatsSection from "@/components/dashboard/StatsSection";
import ApplicationTracker from "@/components/dashboard/ApplicationTracker";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-40 my-15">
      <div className="col-span-4 text-white flex flex-col gap-6">
        <GreetingCard />
        <div>
          <StatsSection />
        </div>
        <ApplicationTracker />
      </div>
    </div>
  );
}
