"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartData = [
  { browser: "safari", visitors: 40, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SidebarProgressChart() {
  return (
    <Card className="flex flex-col bg-card">
      {" "}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            outerRadius="90%"
            innerRadius="80%"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const cx = viewBox.cx ?? 0;
                    const cy = viewBox.cy ?? 0;
                    const fontSize = Math.round(cx * 0.32);
                    const subFontSize = Math.round(cx * 0.14);
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          fill="white"
                          fontSize={fontSize}
                          fontWeight="bold"
                        >
                          {`${chartData[0].visitors.toLocaleString()}%`}
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + subFontSize * 1.6}
                          fill="white"
                          fontSize={subFontSize}
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
