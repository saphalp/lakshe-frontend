import LoginForm from "@/components/login/LoginForm";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col justify-center items-center font-sans gap-5 h-screen">
      <div className="flex flex-col gap-1 items-center">
        <Link href="/">
          <p className="text-3xl text-center text-primary font-extrabold">
            Lakshe
          </p>
        </Link>
        <p className="text-muted-foreground font-medium text-xs tracking-widest uppercase">
          AI Job Accelerator
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default page;
