"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex flex-col justify-center items-center font-sans h-screen px-4 text-white">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-1 mb-12">
        <p className="text-3xl text-center text-indigo-700 font-extrabold">
          Lakshe.co
        </p>
        <p className="text-gray-400 font-bold text-xs tracking-widest">
          CELESTIAL CAREER ACCELERATION
        </p>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-card rounded-2xl p-10 flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Mail className="text-indigo-400" size={36} />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-card flex items-center justify-center text-[10px]">
            ✓
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">Check your inbox</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            We sent a confirmation link to{" "}
            {email ? (
              <span className="text-white font-medium">{email}</span>
            ) : (
              "your email address"
            )}
            . Click it to activate your account and start your journey.
          </p>
        </div>

        {/* Spam tip */}
        <div className="flex items-start gap-2.5 w-full p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-left">
          <AlertCircle size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300/80 leading-relaxed">
            Can't find the email? Check your spam or junk folder — it sometimes ends up there.
          </p>
        </div>

        {/* Back to login */}
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mt-2"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
