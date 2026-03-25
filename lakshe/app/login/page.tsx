import LoginForm from "@/components/ui/LoginForm";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col justify-center items-center font-sans gap-5 h-screen">
      <div className="flex flex-col gap-1 items-center">
        <Link href="/">
          <p className="text-3xl text-center text-indigo-700 font-extrabold">
            Lakshe.co
          </p>
        </Link>
        <p className="text-gray-400 font-bold text-xs">
          CELESTIAL CAREER ACCELERATION
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default page;
