import { useTranslation } from "react-i18next";
import { BadgesSection } from "./BadgesSection";
import type { StreakInfo } from "@/interfaces/api";
import { YearlyChart } from "./MetricsYearlyChart";

interface Props {
  best_streak: StreakInfo;
  total_completed: number;
  level: number; // ← nuevo
  progress_in_level: number; // ← nuevo
  habits_to_next: number; // ← nuevo
  habits_per_level: number;
}

export const MetricsStatGrid: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <YearlyChart />

        <section className="md:col-span-2 lg:col-span-2 bg-surface-tint text-on-primary rounded-lg p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Blob decorativo */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6bfe9c]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#6bfe9c]/15 rounded-full blur-2xl" />

          {/* Header */}
          <div>
            <span className="text-[10px] uppercase tracking-widest font-label font-bold opacity-70">
              {t("app.metrics.momentumMaster")}
            </span>

            {/* Nombre del hábito */}
            {props.best_streak.habit && (
              <div className="flex items-center gap-2 mt-3 mb-1">
                <span
                  className="material-symbols-outlined text-sm opacity-80"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span className="text-2xl font-bold font-label opacity-80 truncate">
                  {props.best_streak.habit}
                </span>
              </div>
            )}

            {/* Número de racha */}
            <h2 className="text-6xl font-extrabold mt-1 font-headline tracking-tighter leading-none">
              {props.best_streak.streak} dia
              {props.best_streak.streak > 1 && "s"}
            </h2>
            <p className="text-lg font-medium opacity-90 mt-1">
              {t("app.metrics.dayStreak")}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emoji_events
              </span>
              <span className="text-lg font-label font-bold opacity-80">
                {t("app.metrics.personalBest")}
              </span>
            </div>
          </div>
        </section>

        <section className="md:col-span-2 lg:col-span-2 bg-secondary-container text-on-secondary-container rounded-lg p-8 flex flex-col justify-between">
          {/* Top */}
          <div>
            <span className="text-[10px] uppercase tracking-widest font-label font-bold opacity-70">
              {t("app.metrics.lifetimeEffort")}
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <h2 className="text-6xl font-extrabold font-headline">
                {props.total_completed.toLocaleString()}
              </h2>
            </div>
            <p className="text-lg font-medium opacity-90">
              {t("app.metrics.habitsRooted")}
            </p>
          </div>

          {/* Bottom — stats derivadas */}
          <div className="mt-8 space-y-4">
            <div className="h-px bg-on-secondary-container/15" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 opacity-80">
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  military_tech
                </span>
                <span className="text-xs font-label font-bold uppercase tracking-widest">
                  {t("app.metrics.level")}
                </span>
              </div>
              <span className="text-xl font-extrabold font-headline">
                {props.level}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 opacity-80">
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_up
                </span>
                <span className="text-xs font-label font-bold uppercase tracking-widest">
                  {t("app.metrics.nextLevel")}
                </span>
              </div>
              <span className="text-sm font-bold opacity-90">
                {props.habits_to_next} {t("app.metrics.toGo")}
              </span>
            </div>

            {/* Barra de progreso al siguiente nivel */}
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-on-secondary-container/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-on-secondary-container rounded-full transition-all duration-700"
                  style={{
                    width: `${(props.progress_in_level / props.habits_per_level) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] opacity-60 font-label">
                  {props.progress_in_level} / {props.habits_per_level}
                </span>
                <span className="text-[10px] opacity-60 font-label">
                  {t("app.metrics.level")} {props.level + 1}
                </span>
              </div>
            </div>
          </div>
        </section>

        <BadgesSection />
      </div>

      <section className="mt-8 bg-tertiary-container text-on-tertiary-container rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-headline">
            {t("app.metrics.newPeak")}
          </h3>
          <p className="font-label opacity-80">
            {t("app.metrics.peakMessage")}
          </p>
        </div>
        <button className="bg-on-tertiary-container text-tertiary-container px-8 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 whitespace-nowrap hover:bg-on-tertiary-fixed">
          {t("app.metrics.optimizeSchedule")}
        </button>
      </section>
    </>
  );
};
