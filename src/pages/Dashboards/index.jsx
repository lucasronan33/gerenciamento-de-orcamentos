"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

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
import {
  getBudgetsByStatus,
  getLast12Months,
  groupBudgetsByDate,
} from "@/utils/budget";
import { Area, AreaChart } from "recharts";
import Header from "../../components/Header";

const configRecipeLast12Months = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
};
const chartConfig = {
  Aprovados: {
    label: "Aprovados",
    color: "var(--chart-1)",
  },
  Orçados: {
    label: "Orçados",
    color: "var(--chart-2)",
  },
  Rejeitados: {
    label: "Rejeitados",
    color: "var(--chart-3)",
  },
};

export const Dashboards = () => {
  const { budgets } = useBudget();

  const formatBudgets = groupBudgetsByDate(budgets);
  const groupedBudgets = getLast12Months(formatBudgets);

  const recipeData = groupedBudgets.map((data) => ({
    month: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      new Date(data.year, data.month - 1, 1),
    ),
    total: data.total,
  }));

  const chartBudgetsApproved = groupedBudgets.map((data) => ({
    month: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      new Date(data.year, data.month - 1, 1),
    ),
    Aprovados: getBudgetsByStatus(
      ["approved", "producing", "finished"],
      data.budgets,
    ).length,
    Rejeitados: getBudgetsByStatus(["rejected"], data.budgets).length,
    Orçados: data.budgets.length,
  }));

  return (
    <div>
      <Header />
      <div
        className="
        w-[95%]
        mx-auto
        flex
        max-sm:flex-col
        gap-5
        "
      >
        <ChartBarDefault
          chartConfig={configRecipeLast12Months}
          data={recipeData}
          title={"Receita nos últimos 12 meses"}
        />
        <ChartAreaGradient
          chartConfig={chartConfig}
          data={chartBudgetsApproved}
          title={"Orçamentos aprovados nos ultimos 12 meses"}
          color={{
            stroke: [
              "var(--brand)",
              "var(--color-approved-dark)",
              "var(--color-red-500)",
            ],
            primary: [
              "var(--brand)",
              "var(--color-approved-dark)",
              "var(--color-red-500)",
            ],
            secondary: [
              "var(--color-cyan-900)",
              "var(--color-green-900)",
              "var(--color-red-900)",
            ],
          }}
        />
      </div>
    </div>
  );
};

export function ChartBarDefault({ data, chartConfig, title, color }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 w-full">
        <ChartContainer config={chartConfig} className="w-full h-[25vh]">
          <BarChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="recipe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="var(--color-cyan-900)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="url(#recipe)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm h-full">
        <div className="leading-none text-muted-foreground">
          <MonthPercent
            data={data}
            subdata={"total"}
            text={"Receita comparado ao mês anterior:"}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChartAreaGradient({ title, data, chartConfig, color }) {
  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className={"w-full p-0"}>
        <ChartContainer config={chartConfig} className="h-[25vh] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={[0, "dataMax+3"]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillAprovados" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color.primary[1]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={color.secondary[1]}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOrcados" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color.primary[0]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={color.secondary[0]}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRejeitados" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color.primary[2]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={color.secondary[2]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="Orçados"
              type="linear"
              fill="url(#fillOrcados)"
              fillOpacity={0.4}
              stroke={color.stroke[0]}
            />
            <Area
              dataKey="Aprovados"
              type="linear"
              fill="url(#fillAprovados)"
              fillOpacity={0.4}
              stroke={color.stroke[1]}
            />
            <Area
              dataKey="Rejeitados"
              type="linear"
              fill="url(#fillRejeitados)"
              fillOpacity={0.4}
              stroke={color.stroke[2]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 4,
                paddingBottom: 4,
              }}
              labelStyle={{
                letterSpacing: "0.05em",
              }}
              iconType="square"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className={"h-full"}>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="leading-none text-muted-foreground">
              <MonthPercent
                data={data}
                subdata={"Orçados"}
                text={"Orçamentos emititdos comparado ao mês anterior:"}
              />
            </div>
            <div className="leading-none text-muted-foreground">
              <MonthPercent
                data={data}
                subdata={"Aprovados"}
                text={"Orçamentos aprovados comparado ao mês anterior:"}
              />
            </div>
            <div className="leading-none text-muted-foreground">
              <MonthPercent
                data={data}
                subdata={"Rejeitados"}
                text={"Orçamentos rejeitados comparado ao mês anterior:"}
              />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const MonthPercent = ({ data, subdata, text }) => {
  const result = (
    ((data[data.length - 1]?.[subdata] - data[data.length - 2]?.[subdata]) /
      data[data.length - 2]?.[subdata]) *
    100
  ).toFixed(2);

  return Number(result) > 0 ? (
    <span>
      {text}
      <span className="font-bold text-approved-dark"> +{result}%</span>
    </span>
  ) : (
    <span>
      {text}
      <span className="font-bold text-rejected-dark"> {result}%</span>
    </span>
  );
};
