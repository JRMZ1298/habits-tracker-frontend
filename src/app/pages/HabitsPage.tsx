import { useTranslation } from "react-i18next";
import { HabitsSummarySection } from "../components/HabitsSummarySection";
import { HabitsManagement } from "../components/HabitsManagement";
import { HabitsGrid } from "../components/HabitsGrid";
import { useProfileStats } from "../hooks/useProfileStats";
import { useNavigate } from "react-router";
import { useHabitsGrid } from "../hooks/useHabits";

export const HabitsPage = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();
  const navigate = useNavigate();
  const { habits, data, page, setPage, search, setSearch, isLoading } =
    useHabitsGrid(6);

  return (
    <div className="space-y-[48px]">
      <HabitsSummarySection
        best_current_streak={
          profile?.best_current_streak ?? { habit: "ninguno", streak: 0 }
        }
      />

      <HabitsManagement search={search} onSearch={setSearch} />

      <HabitsGrid
        habits={habits}
        data={data}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
      />

      <div className="pt-[17px] hidden md:block">
        <button
          onClick={() => navigate("/app/habits/new")}
          className="w-full py-[32px] border border-hairline rounded-[18px] flex flex-col items-center justify-center gap-[8px] group transition-transform active:scale-[0.99] bg-canvas"
        >
          <span className="material-symbols-outlined text-[32px] text-primary group-hover:scale-105 transition-transform">
            add_circle
          </span>
          <span className="text-[17px] text-primary font-normal leading-[1.47]">
            {t("app.habits.cultivateNewHabit")}
          </span>
        </button>
      </div>
    </div>
  );
};
