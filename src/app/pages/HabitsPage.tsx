import { useTranslation } from "react-i18next";
import { HabitsSummarySection } from "../components/HabitsSummarySection";
import { HabitsManagement } from "../components/HabitsManagement";
import { HabitsGrid } from "../components/HabitsGrid";
import { useProfileStats } from "../hooks/useProfileStats";

export const HabitsPage = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();

  return (
    <div>
      <HabitsSummarySection
        best_current_streak={
          profile?.best_current_streak ?? { habit: "ninguno", streak: 0 }
        }
      />

      <HabitsManagement />

      <HabitsGrid />

      <div className="mt-12 hidden md:block">
        <button className="w-full py-8 border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center gap-2 group hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:scale-110 transition-transform">
            add_circle
          </span>
          <span className="text-lg font-bold text-on-surface-variant">
            {t("app.habits.cultivateNewHabit")}
          </span>
        </button>
      </div>
    </div>
  );
};
