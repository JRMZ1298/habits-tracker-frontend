import { useTranslation } from "react-i18next";
import { BadgesSection } from "./BadgesSection";
import type { StreakInfo } from "@/interfaces/api";
import { YearlyChart } from "./MetricsYearlyChart";

interface Props {
  best_streak: StreakInfo;
  total_completed: number;
  level: number;
  progress_in_level: number;
  habits_to_next: number;
  habits_per_level: number;
}

export const MetricsStatGrid: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-[24px]">
        {/* Yearly Chart - Light Tile */}
        <div className="bg-canvas border border-hairline rounded-[18px] p-[24px] md:p-[32px]">
          <YearlyChart />
        </div>

        {/* Stats Row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {/* Best Streak - Dark Tile */}
          <section className="bg-surface-tile-1 text-on-dark rounded-[18px] p-[32px] flex flex-col justify-between min-h-[280px]">
            <div className="space-y-[12px]">
              <span className="text-[12px] text-body-muted tracking-[-0.12px]">
                {t("app.metrics.momentumMaster")}
              </span>

              {props.best_streak.habit && (
                <div className="flex items-center gap-[8px] mt-[12px]">
                  <span
                    className="material-symbols-outlined text-[16px] text-primary-on-dark"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_fire_department
                  </span>
                  <span className="text-[17px] text-body-muted truncate">
                    {props.best_streak.habit}
                  </span>
                </div>
              )}

              <h2
                className="text-[56px] font-semibold leading-[1.07] text-body-on-dark mt-[8px]"
                style={{ letterSpacing: "-0.28px" }}
              >
                {props.best_streak.streak}
              </h2>
              <p className="text-[17px] text-body-muted leading-[1.47]">
                {t("app.metrics.dayStreak")}
              </p>
            </div>

            <div className="mt-[32px] pt-[17px] border-t border-surface-tile-2 flex items-center gap-[8px]">
              <span
                className="material-symbols-outlined text-[16px] text-primary-on-dark"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emoji_events
              </span>
              <span className="text-[14px] text-body-muted tracking-[-0.224px]">
                {t("app.metrics.personalBest")}
              </span>
            </div>
          </section>

          {/* Lifetime Effort - Light Tile */}
          <section className="bg-canvas border border-hairline rounded-[18px] p-[32px] flex flex-col justify-between min-h-[280px]">
            <div className="space-y-[12px]">
              <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
                {t("app.metrics.lifetimeEffort")}
              </span>
              <div className="mt-[8px]">
                <h2
                  className="text-[56px] font-semibold text-ink leading-[1.07]"
                  style={{ letterSpacing: "-0.28px" }}
                >
                  {props.total_completed.toLocaleString()}
                </h2>
                <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
                  {t("app.metrics.habitsRooted")}
                </p>
              </div>
            </div>

            <div className="mt-[32px] pt-[17px] border-t border-hairline space-y-[17px]">
              {/* Level */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                  <span
                    className="material-symbols-outlined text-[16px] text-ink-muted-48"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  <span className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
                    {t("app.metrics.level")}
                  </span>
                </div>
                <span
                  className="text-[21px] font-semibold text-ink leading-[1.19]"
                  style={{ letterSpacing: "0.231px" }}
                >
                  {props.level}
                </span>
              </div>

              {/* Next Level */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                  <span
                    className="material-symbols-outlined text-[16px] text-ink-muted-48"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                  <span className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
                    {t("app.metrics.nextLevel")}
                  </span>
                </div>
                <span className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
                  {props.habits_to_next} {t("app.metrics.toGo")}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-[8px]">
                <div className="w-full h-[5px] bg-canvas-parchment rounded-[5px] overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-[5px] transition-all duration-700"
                    style={{
                      width: `${(props.progress_in_level / props.habits_per_level) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
                    {props.progress_in_level} / {props.habits_per_level}
                  </span>
                  <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
                    {t("app.metrics.level")} {props.level + 1}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Badges */}
        <div className="bg-canvas border border-hairline rounded-[18px] p-[24px] md:p-[32px]">
          <BadgesSection />
        </div>
      </div>
    </>
  );
};
