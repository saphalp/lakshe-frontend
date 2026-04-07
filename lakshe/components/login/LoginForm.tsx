"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ message: string; ok: boolean } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus({ message: error.message, ok: false });
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-[0_0_50px_rgba(5,23,105,0.4)]">
      <CardHeader>
        <CardTitle className="text-2xl text-white text-center font-bold">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="text-gray-400">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-bold">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-xs font-bold">
                  PASSWORD
                </Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-xs font-bold underline-offset-4 text-indigo-700"
                >
                  FORGOT PASSWORD?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 bg-transparent">
        {status && (
          <p className={status.ok ? "text-green-400" : "text-red-400"}>
            {status.message}
          </p>
        )}
        <p className="text-gray-400 text-xs font-bold mt-2">
          {" "}
          DONT'T HAVE AN ACCOUNT?{" "}
          <a href="/sign-up" className="text-indigo-700">
            CREATE ONE
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
