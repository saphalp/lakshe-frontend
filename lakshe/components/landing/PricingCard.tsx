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

interface PricingCardProps {
  plan: String;
  description: String;
  feature: boolean;
  price: String;
  includes: Array<String>;
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
      className={`w-full max-w-md p-6 ${feature ? "border-3 border-yellow-500" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-2xl text-white font-bold">{plan}</CardTitle>
        <CardDescription className="">{description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="text-3xl text-white font-bold inline">${price}</p>
        <p className="inline text-lg text-gray-400">/mo</p>
        <ul className="text-white flex flex-col gap-4 mt-6 text-md">
          {includes.map((item, index) => (
            <li key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-emerald-300 inline mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>{" "}
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2 bg-transparent">
        <Button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-600 h-10"
          disabled={!active}
        >
          {active ? "Get Started" : "Comming Soon"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PricingCard;
