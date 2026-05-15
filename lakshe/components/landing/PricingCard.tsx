import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  plan: string;
  description: string;
  feature: boolean;
  price: string;
  includes: string[];
  active: boolean;
}

function PricingCard({
  plan,
  description,
  price,
  includes,
  feature,
  active,
}: PricingCardProps) {
  return (
    <Card
      className={`w-full max-w-sm p-2 flex flex-col transition-all duration-200 ${
        feature
          ? "border-brand bg-brand-muted shadow-[0_0_40px_rgba(79,128,245,0.15)]"
          : "border-border bg-card"
      }`}
    >
      <CardHeader className="pb-2">
        {feature && (
          <span className="text-xs font-semibold text-brand uppercase tracking-wider mb-2">
            Most Popular
          </span>
        )}
        <CardTitle className="text-2xl text-foreground font-bold">
          {plan}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl text-foreground font-extrabold">
            ${price}
          </span>
          <span className="text-muted-foreground text-sm ml-1">/month</span>
        </div>
        <ul className="flex flex-col gap-3">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 bg-transparent">
        <Link href="/sign-up" className="w-full">
          <Button
            className={`w-full ${feature ? "" : "bg-secondary text-foreground hover:bg-muted border border-border"}`}
            variant={feature ? "default" : "ghost"}
            disabled={!active}
          >
            {active ? "Get Started" : "Coming Soon"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default PricingCard;
