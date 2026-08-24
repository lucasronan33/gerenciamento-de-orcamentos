"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useBudget } from "@/context/Budget";
import { groupBudgetsByDate } from "@/utils/budget";
import { months } from "@/utils/schedule";
import Header from "../../components/Header";

export const Dashboards = () => {
  return (
    <div>
      <Header />
      <div
        className="
        w-1/2
        m-auto
      "
      >
        <ChartBarDefault />
      </div>
    </div>
  );
};

export const description = "A bar chart";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
};

export function ChartBarDefault() {
  const { budgets } = useBudget();

  const paidBudgets = budgets.filter((b) => b.totals.amountPaid && b.totals);
  const groupedBudgets = groupBudgetsByDate(paidBudgets);
  console.log(groupedBudgets);

  const chartData = Object.entries(groupedBudgets[2026]).map(
    ([month, data]) => ({
      month: months[month - 1],
      total: data.total,
    }),
  );

  return (
    <Card>
      <CardHeader>
        <CardDescription>Receita nos últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
