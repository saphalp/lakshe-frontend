"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '../ui/button'
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { type User } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <>
      <nav className="flex justify-between py-4 px-4 md:px-8 lg:px-20 font-sans sticky items-center text-md">
        <Link href="/" className="font-bold text-white text-xl lg:w-60">
          {" "}
          Lakshe{" "}
        </Link>
        <ul className="hidden lg:flex gap-10 text-[oklch(55.4%_0.046_257.417)] items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex gap-7 lg:w-60 justify-end">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white">
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant={"default"} size={"sm"} className="w-30">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button variant={"default"} size={"sm"} className="w-40">
                View My Account
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card text-white border-gray-800">
              <div className="flex flex-col gap-8 mt-10">
                <ul className="flex flex-col gap-6 text-lg text-[oklch(55.4%_0.046_257.417)]">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} onClick={() => setIsOpen(false)}>{label}</Link>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4">
                  {!user ? (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                        <Button variant={"default"} className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant={"default"} className="w-full">
                        View My Account
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <hr className="border-[oklch(55.4%_0.046_257.417)]" />
    </>
  );
}
