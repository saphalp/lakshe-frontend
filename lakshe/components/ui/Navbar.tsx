"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
    <nav className="flex justify-between py-4 px-20 font-sans sticky items-center text-md">
      <Link href='/' className="font-bold text-white text-xl w-60"> Lakshe </Link>
      <ul className="flex gap-10 text-[oklch(55.4%_0.046_257.417)] items-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-7 w-60">
        <Link href='/login'><button className="w-15 h-10 text-white cursor-pointer"> Log in </button></Link>
        <Link href='/sign-up'><Button variant={'default'} size={'sm'}>Get Started</Button></Link>
      </div>
    </nav>
    <hr className="border-[oklch(55.4%_0.046_257.417)]" />
    </>
  );
}