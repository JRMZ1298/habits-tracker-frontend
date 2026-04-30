import { useTranslation } from "react-i18next";
import { useWeeklySummary } from "../hooks/useWeeklyLogs";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { useRecommendation } from "../hooks/useRecommendation";

const DAY_LABELS: Record<string, string> = {
  Sun: "Dom",
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mié",
  Thu: "Jue",
  Fri: "Vie",
  Sat: "Sáb",
};

const chartConfig = {
  completed: {
    label: "Hábitos completados",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const DashboardStatsSidebar = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useWeeklySummary();
  const { data: recommendation, isLoading: recLoading } = useRecommendation();

  const today = new Date().toLocaleDateString("en-CA");

  // Transformar para Recharts — una fila por día
  const chartData = (data ?? []).map((d) => ({
    day: DAY_LABELS[d.day] ?? d.day,
    completed: d.completed,
    isToday: d.date === today,
  }));

  return (
    <aside className="space-y-8">
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl space-y-6">
        <h3 className="text-xl font-bold font-headline">
          {t("app.dashboard.weeklyView")}
        </h3>

        {isLoading ? (
          <div className="flex justify-between items-end h-32 gap-2 animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-surface-container-high rounded-full h-full" />
                <span className="text-[10px] font-bold text-outline">···</span>
              </div>
            ))}
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="min-h-32 w-full text-primary-dim"
          >
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--chart-2)" />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fontWeight: 600 }}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value} hábitos`, ""]}
                    labelFormatter={(label) => label}
                  />
                }
              />

              <Bar dataKey="completed" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.isToday
                        ? "var(--chart-1)"
                        : entry.completed > 0
                          ? "var(--chart-2)"
                          : "var(--chart-2)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}

        {!isLoading && (
          <p className="text-xs text-outline text-right">
            {data?.reduce((s, d) => s + d.completed, 0)}{" "}
            {t("app.dashboard.thisWeek")}
          </p>
        )}
      </div>
      {recLoading ? (
        <div className="h-48 bg-gray-200 animate-pulse rounded-xl" />
      ) : (
        <div className="rounded-xl overflow-hidden relative group cursor-pointer">
          <img
            alt={recommendation?.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            src={recommendation?.image}
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent p-6 flex flex-col justify-end">
            <span className="text-xs font-bold text-on-primary/80 uppercase tracking-widest">
              {t("app.dashboard.recommended")}
            </span>
            <h4 className="text-lg font-bold text-on-primary">
              {recommendation?.title}
            </h4>
          </div>
        </div>
      )}
    </aside>
  );
};
