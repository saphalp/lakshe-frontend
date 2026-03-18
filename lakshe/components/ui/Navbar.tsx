"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
    <nav className="flex justify-between px-15 py-4 font-sans sticky items-center text-md">
      <Link href='/' className="font-bold text-white text-xl"> Lakshe </Link>
      <ul className="flex gap-10 text-[oklch(55.4%_0.046_257.417)] items-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-7">
        <button className="text-white"> Log in </button>
        <button className="bg-emerald-400 w-30 h-10 text-white rounded-sm"> Get Started </button>
      </div>
    </nav>
    <hr className="border-[oklch(55.4%_0.046_257.417)]" />
    </>
  );
}