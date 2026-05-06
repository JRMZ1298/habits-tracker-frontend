import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Dot } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useYearlySummary } from "../hooks/useWeeklyLogs";

const MONTH_LABELS: Record<string, string> = {
  Jan: "Ene",
  Feb: "Feb",
  Mar: "Mar",
  Apr: "Abr",
  May: "May",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Sep",
  Oct: "Oct",
  Nov: "Nov",
  Dec: "Dic",
};

const chartConfig = {
  completed: {
    label: "Hábitos completados",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const YearlyChart = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useYearlySummary();

  const currentMonth = new Date().getMonth() + 1;

  const chartData = (data ?? []).map((d) => ({
    label: MONTH_LABELS[d.label] ?? d.label,
    completed: d.completed,
    month: d.month,
    isCurrent: d.month === currentMonth,
    value: d.month <= currentMonth ? d.completed : null,
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex justify-between items-start">
          <div className="space-y-[8px]">
            <div className="h-[12px] w-32 bg-canvas-parchment rounded animate-pulse" />
            <div className="h-[28px] w-20 bg-canvas-parchment rounded animate-pulse" />
          </div>
          <div className="flex gap-[24px]">
            <div className="h-[24px] w-16 bg-canvas-parchment rounded animate-pulse" />
            <div className="h-[24px] w-12 bg-canvas-parchment rounded animate-pulse" />
          </div>
        </div>
        <div className="h-[160px] bg-canvas-parchment rounded-[5px] animate-pulse" />
      </div>
    );
  }

  const total = data?.reduce((s, d) => s + d.completed, 0) ?? 0;
  const peak = data?.reduce(
    (max, d) => (d.completed > max.completed ? d : max),
    { label: "", completed: 0 },
  );

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-[4px]">
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            {t("app.metrics.yearlyProgress")}
          </span>
          <h2
            className="text-[28px] font-semibold text-ink leading-[1.14]"
            style={{ letterSpacing: "0.196px" }}
          >
            {new Date().getFullYear()}
          </h2>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-[24px] text-right">
          <div>
            <p
              className="text-[21px] font-semibold text-ink leading-[1.19]"
              style={{ letterSpacing: "0.231px" }}
            >
              {total.toLocaleString()}
            </p>
            <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
              {t("app.metrics.totalYear")}
            </p>
          </div>
          {peak && peak.completed > 0 && (
            <div>
              <p
                className="text-[21px] font-semibold text-ink leading-[1.19]"
                style={{ letterSpacing: "0.231px" }}
              >
                {peak.completed}
              </p>
              <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
                {MONTH_LABELS[peak.label] ?? peak.label}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="min-h-[160px] w-full"
      >
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 400,
              fill: "#7a7a7a",
              letterSpacing: "-0.12px",
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 400,
              fill: "#7a7a7a",
              letterSpacing: "-0.12px",
            }}
            allowDecimals={false}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`${value} hábitos`, ""]}
                labelFormatter={(label) => label}
              />
            }
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#0066cc"
            strokeWidth={2.5}
            dot={({ cx, cy, payload }) => {
              if (payload.value === null) return <g key={cx} />;
              return (
                <Dot
                  key={`dot-${cx}`}
                  cx={cx}
                  cy={cy}
                  r={payload.isCurrent ? 5 : 3}
                  fill={payload.isCurrent ? "#0066cc" : "#e0e0e0"}
                  stroke="#0066cc"
                  strokeWidth={3}
                />
              );
            }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            connectNulls={false}
          />
        </LineChart>
      </ChartContainer>

      {/* Legend */}
      <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
        {t("app.metrics.futureMonths")}
      </p>
    </div>
  );
};
