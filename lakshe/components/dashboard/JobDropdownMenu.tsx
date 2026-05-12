"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

interface MenuProps {
  userJobId: number;
  status: string;
}

const ALL_STATUSES: { label: string; value: string }[] = [
  { label: "Saved", value: "saved" },
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export function JobDropdownMenu({ userJobId, status }: MenuProps) {
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    const supabase = getSupabaseBrowserClient();
    await supabase.from("user_jobs").update({ status: newStatus }).eq("id", userJobId);
    router.refresh();
  };

  const handleRemove = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.from("user_jobs").delete().eq("id", userJobId);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Ellipsis size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Manage</DropdownMenuLabel>
          <DropdownMenuItem
            className="text-red-400 focus:text-red-400"
            onClick={handleRemove}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {ALL_STATUSES.filter((s) => s.value !== status).map((s) => (
                  <DropdownMenuItem key={s.value} onClick={() => handleStatusChange(s.value)}>
                    {s.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
