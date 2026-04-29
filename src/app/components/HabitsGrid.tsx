import { useTranslation } from "react-i18next";
import { HabitCard } from "./HabitCard";
import { useHabitsGrid } from "../hooks/useHabits";
import { useHabitsStats } from "../hooks/useHabits";
import { buildHabitCardProps } from "@/lib/habitCardProps";
import { useDeleteHabit } from "../hooks/useHabits";
import { useNavigate } from "react-router";

export const HabitsGrid = () => {
  const { t } = useTranslation();

  const { habits, isLoading, data, page, setPage } = useHabitsGrid(6);
  const habitIds = habits.map((h) => h.id);
  const { statsMap, isLoading: statsLoading } = useHabitsStats(habitIds);
  const deleteHabit = useDeleteHabit();
  const navigate = useNavigate();

  if (isLoading || statsLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-lg p-6 animate-pulse h-40"
          />
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <span className="material-symbols-outlined text-6xl text-outline-variant">
          sentiment_neutral
        </span>
        <p className="text-outline text-center">{t("app.habits.noHabits")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {habits.map((habit, index) => {
          const stats = statsMap[habit.id];
          const props = buildHabitCardProps(habit, stats, index);

          return (
            <HabitCard
              key={habit.id}
              {...props}
              // Callbacks de acciones
              onEdit={() => navigate(`/app/habits/edit/${habit.id}`)} // conecta tu modal de edición
              onDelete={() => deleteHabit.mutate(habit.id)}
              isDeleting={
                deleteHabit.isPending && deleteHabit.variables === habit.id
              }
            />
          );
        })}
      </div>

      {/* Paginación */}
      {(data?.total_pages ?? 1) > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!data?.has_prev}
            className="flex items-center gap-2 text-sm font-semibold text-outline hover:text-on-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            {t("app.dashboard.prev")}
          </button>

          <span className="text-sm text-outline">
            {page} / {data?.total_pages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.has_next}
            className="flex items-center gap-2 text-sm font-semibold text-outline hover:text-on-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t("app.dashboard.next")}
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
