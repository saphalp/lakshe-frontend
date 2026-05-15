"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { type User } from "@supabase/supabase-js";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <>
      <nav className="flex justify-between py-4 px-4 md:px-8 lg:px-20 sticky top-0 z-50 items-center bg-background/80 backdrop-blur-sm">
        <Link href="/" className="font-bold text-foreground text-xl lg:w-60">
          Lakshe
        </Link>

        <ul className="hidden lg:flex gap-8 text-muted-foreground items-center text-sm">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-foreground transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-4 lg:w-60 justify-end">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="px-5">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="sm" className="px-5">
                My Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-card border-border w-72 flex flex-col p-6 gap-0"
            >
              {/* Accessible title (screen-reader only — logo serves as visual heading) */}
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              {/* Logo */}
              <Link
                href="/"
                className="font-bold text-foreground text-xl mb-8"
                onClick={() => setIsOpen(false)}
              >
                Lakshe
              </Link>

              {/* Nav links */}
              <ul className="flex flex-col gap-1">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block py-2.5 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA buttons pushed to bottom */}
              <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-border">
                {!user ? (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full text-base h-11">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      <Button className="w-full text-base h-11">Get Started</Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full text-base h-11">My Dashboard</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <hr className="border-border" />
    </>
  );
}
