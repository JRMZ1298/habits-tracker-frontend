import type { StreakInfo } from "@/interfaces/api";
import { useTranslation } from "react-i18next";

interface Props {
  best_current_streak: StreakInfo;
}

export const HabitsSummarySection: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Current Focus - Light Tile */}
      <div className="bg-canvas p-[48px] md:p-[80px] flex flex-col justify-between min-h-[280px]">
        <div className="space-y-[12px]">
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            {t("app.habits.currentFocus")}
          </span>
          <h2
            className="text-[40px] font-semibold text-ink leading-[1.1]"
            style={{ letterSpacing: "-0.28px" }}
          >
            {props.best_current_streak.habit}
          </h2>
          <p className="text-[17px] text-ink-muted-48 leading-[1.47] max-w-sm">
            {t("app.habits.streakMessage")}
          </p>
        </div>
      </div>

      {/* Streak - Dark Tile */}
      <div className="bg-surface-tile-1 text-on-dark p-[48px] md:p-[80px] flex flex-col justify-center items-center text-center min-h-[280px]">
        <div className="space-y-[12px]">
          <span
            className="material-symbols-outlined text-[48px] text-primary-on-dark"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <div
            className="text-[56px] font-semibold leading-[1.07] text-body-on-dark"
            style={{ letterSpacing: "-0.28px" }}
          >
            {props.best_current_streak.streak}
          </div>
          <div className="text-[14px] text-body-muted tracking-[-0.224px] uppercase">
            {t("app.habits.dayStreak")}
          </div>
        </div>
      </div>
    </div>
  );
};
