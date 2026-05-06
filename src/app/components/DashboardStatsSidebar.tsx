import { useTranslation } from "react-i18next";
import { useWeeklySummary } from "../hooks/useWeeklyLogs";
import { Bar, BarChart, XAxis, Cell } from "recharts";
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

  const chartData = (data ?? []).map((d) => ({
    day: DAY_LABELS[d.day] ?? d.day,
    completed: d.completed,
    isToday: d.date === today,
  }));

  const weekTotal = data?.reduce((s, d) => s + d.completed, 0) ?? 0;

  return (
    <aside className="space-y-[24px]">
      {/* Weekly View */}
      <div className="bg-canvas border border-hairline p-[24px] rounded-[18px]">
        <div className="flex items-center justify-between mb-[24px]">
          <h3 className="text-[17px] font-semibold text-ink leading-[1.24]">
            {t("app.dashboard.weeklyView")}
          </h3>
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            7 días
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-between items-end h-[128px] gap-[6px] animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-[8px]">
                <div className="w-full bg-canvas-parchment rounded-[5px] h-full" />
                <span className="text-[10px] text-ink-muted-48">···</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className="min-h-[128px] w-full"
            >
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
              >
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`${value} hábitos`, ""]}
                      labelFormatter={(label) => label}
                    />
                  }
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 400,
                    fill: "#7a7a7a",
                    letterSpacing: "-0.12px",
                  }}
                />
                <Bar dataKey="completed" radius={[5, 5, 5, 5]} maxBarSize={28}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.isToday
                          ? "#0066cc"
                          : "#e0e0e0"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>

            <div className="flex items-center justify-between mt-[17px] pt-[17px] border-t border-hairline">
              <span className="text-[14px] text-ink-muted-48 leading-[1.43]">
                {t("app.dashboard.thisWeek")}
              </span>
              <span className="text-[21px] font-semibold text-ink leading-[1.19]">
                {weekTotal}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Recommendation */}
      {recLoading ? (
        <div className="h-[200px] bg-canvas border border-hairline rounded-[18px] animate-pulse" />
      ) : (
        <div className="bg-canvas border border-hairline rounded-[18px] overflow-hidden">
          <div className="relative">
            <img
              alt={recommendation?.title}
              className="w-full h-[200px] object-cover"
              src={recommendation?.image}
              style={{ borderRadius: 0 }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-[24px] bg-gradient-to-t from-surface-black/80 to-transparent">
              <span className="text-[12px] text-body-muted tracking-[-0.12px] uppercase">
                {t("app.dashboard.recommended")}
              </span>
              <h4 className="text-[17px] font-semibold text-on-dark mt-[4px] leading-[1.24]">
                {recommendation?.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
