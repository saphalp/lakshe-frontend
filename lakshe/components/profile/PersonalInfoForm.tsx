"use client";

import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Button } from "../ui/button";
import { useFetchUser } from "@/hooks/useFetchUser";

type Profile = {
  id: string;
  f_name: string | null;
  l_name: string | null;
  email: string | null;
  phone: string | null;
  headline : string | null;
  linkedin: string | null;
  github: string | null;
};

function PersonalInfoForm() {
  const { userId, loading } = useFetchUser()

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [headline, setHeadline] = useState("")
  const [status, setStatus] = useState<string | null>(null);



useEffect(() => {
  if (!userId) return

  const fetchUserProfile = async () => {
    const supabase = getSupabaseBrowserClient()

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("f_name, l_name, email, phone, headline, linkedin_url, github_url")
      .eq("id", userId)
      .maybeSingle()

    if (error) {
      console.error("Error fetching profile:", error)
      return
    }

    if (profile) {
      setFname(profile.f_name ?? "")
      setLname(profile.l_name ?? "")
      setEmail(profile.email ?? "")
      setPhone(profile.phone ?? "")
      setHeadline(profile.headline ?? "")
      setLinkedin(profile.linkedin_url ?? "")
      setGithub(profile.github_url ?? "")
    }
  }

  fetchUserProfile()
}, [userId])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseBrowserClient();

    if (!user) {
      setStatus("User not authenticated");
      return;
    }

    setLoading(true);
    setStatus(null);

    const { error } = await supabase
    .from("profiles")
    .update({
      f_name: fname,
      l_name: lname,
      email: email,
      phone: phone,
      headline: headline,
      linkedin_url: linkedin,
      github_url: github,
    })
    .eq("id", user.id); 

    setLoading(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Profile updated successfully");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 p-5 bg-card my-10 rounded-lg text-gray-400">
        
        {/* Status */}
        {status && (
          <div className="bg-card/50 p-2 text-sm rounded">
            {status}
          </div>
        )}

        {/* Name */}
        <div className="flex gap-3">
          <div className="grid gap-2 w-1/2">
            <Label htmlFor="fname" className="text-xs font-bold">
              FIRST NAME
            </Label>
            <Input
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="grid gap-2 w-1/2">
            <Label htmlFor="lname" className="text-xs font-bold">
              LAST NAME
            </Label>
            <Input
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-3">
          <div className="grid gap-2 w-1/2">
            <Label htmlFor="email" className="text-xs font-bold">
              EMAIL
            </Label>
            <Input id="email" value={email} disabled />
          </div>

          <div className="grid gap-2 w-1/2">
            <Label htmlFor="phone" className="text-xs font-bold">
              PHONE
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Headline */}
        <div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="summary" className="text-xs font-bold">
              PROFESSIONAL HEADLINE
            </Label>
            <Textarea
              id="summary"
              placeholder="Sr. Software Engineer | AWS Certified"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-3">
          <div className="grid gap-2 w-1/2">
            <Label htmlFor="linkedin" className="text-xs font-bold">
              LINKEDIN
            </Label>
            <Input
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <div className="grid gap-2 w-1/2">
            <Label htmlFor="github" className="text-xs font-bold">
              GITHUB
            </Label>
            <Input
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-white p-2 rounded mt-4 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default PersonalInfoForm;