import { useTranslation } from "react-i18next";
import { HabitsSummarySection } from "../components/HabitsSummarySection";
import { HabitsManagement } from "../components/HabitsManagement";
import { HabitsGrid } from "../components/HabitsGrid";

export const HabitsPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HabitsSummarySection />

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
