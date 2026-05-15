import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToActionCard() {
  return (
    <section className="mt-20 lg:mt-40 px-4 md:px-8 lg:px-20 pb-10">
      <div className="rounded-2xl bg-brand-soft border border-brand/20 p-10 md:p-16 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground max-w-2xl leading-snug">
          Ready to accelerate your job search?
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg">
          Join job seekers who are using Lakshe to land interviews faster,
          generate better resumes, and track every opportunity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="px-10 gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="px-10 border-border text-muted-foreground hover:text-foreground"
            >
              Log in
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Free plan available · No credit card required
        </p>
      </div>
    </section>
  );
}
