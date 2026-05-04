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

  const currentMonth = new Date().getMonth() + 1; // 1-12

  // Traducir etiquetas y marcar mes actual
  const chartData = (data ?? []).map((d) => ({
    label: MONTH_LABELS[d.label] ?? d.label,
    completed: d.completed,
    month: d.month,
    isCurrent: d.month === currentMonth,
    // Meses futuros — null para que la línea no los dibuje
    value: d.month <= currentMonth ? d.completed : null,
  }));

  if (isLoading) {
    return (
      <div className="bg-surface-container-low rounded-lg p-8 animate-pulse h-64" />
    );
  }

  const total = data?.reduce((s, d) => s + d.completed, 0) ?? 0;
  const peak = data?.reduce(
    (max, d) => (d.completed > max.completed ? d : max),
    { label: "", completed: 0 },
  );

  return (
    <section className="md:col-span-4 lg:col-span-4 bg-surface-container-low rounded-lg p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-label font-bold text-surface-tint">
            {t("app.metrics.yearlyProgress")}
          </span>
          <h2 className="text-3xl font-bold font-headline mt-1 text-surface-tint">
            {new Date().getFullYear()}
          </h2>
        </div>

        {/* Stats rápidas */}
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-2xl font-extrabold font-headline text-surface-tint">
              {total.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-widest font-label text-outline">
              {t("app.metrics.totalYear")}
            </p>
          </div>
          {peak && peak.completed > 0 && (
            <div>
              <p className="text-2xl font-extrabold font-headline text-surface-tint">
                {peak.completed}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-label text-outline">
                {MONTH_LABELS[peak.label] ?? peak.label}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfica */}
      <ChartContainer
        config={chartConfig}
        className="min-h-40 w-full text-outline"
      >
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="hsl(var(--color-outline-variant) / 0.2)"
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fontWeight: 600 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10 }}
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
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={({ cx, cy, payload }) => {
              if (payload.value === null) return <g key={cx} />;
              return (
                <Dot
                  key={`dot-${cx}`}
                  cx={cx}
                  cy={cy}
                  r={payload.isCurrent ? 5 : 3}
                  fill={payload.isCurrent ? "var(--chart-1)" : "var(--chart-2)"}
                  stroke="var(--chart-1)"
                  strokeWidth={3}
                />
              );
            }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            connectNulls={false} // No conecta los meses futuros
          />
        </LineChart>
      </ChartContainer>

      {/* Leyenda meses futuros */}
      <p className="text-[10px] text-outline font-label">
        {t("app.metrics.futureMonths")}
      </p>
    </section>
  );
};
