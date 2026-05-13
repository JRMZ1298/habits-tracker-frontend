import { useTranslation } from "react-i18next";
import { HabitCard } from "./HabitCard";
import { useHabitsProgress } from "../hooks/useHabits";
import { buildHabitCardProps } from "@/lib/habitCardProps";
import { useDeleteHabit } from "../hooks/useHabits";
import { useNavigate } from "react-router";
import type { Habit, PaginatedHabits } from "@/interfaces/api";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  habits: Habit[];
  data: PaginatedHabits | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}

export const HabitsGrid: React.FC<Props> = ({
  habits,
  data,
  page,
  setPage,
  isLoading,
}) => {
  const { t } = useTranslation();
  const habitIds = habits.map((h) => h.id);
  const { progressMap, isLoading: statsLoading } = useHabitsProgress(habitIds);
  const deleteHabit = useDeleteHabit();
  const navigate = useNavigate();

  if (isLoading || statsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-canvas border border-hairline rounded-[18px] p-[24px] animate-pulse h-[180px]"
          />
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[80px] gap-[17px]">
        <span className="material-symbols-outlined text-[64px] text-ink-muted-48">
          sentiment_neutral
        </span>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47] text-center">
          {t("app.habits.noHabits")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {habits.map((habit) => {
          const progress = progressMap[habit.id];
          const props = buildHabitCardProps(habit, progress);

          return (
            <HabitCard
              key={habit.id}
              {...props}
              onEdit={() => navigate(`/app/habits/edit/${habit.id}`)}
              onDelete={() => deleteHabit.mutate(habit.id)}
              isDeleting={
                deleteHabit.isPending && deleteHabit.variables === habit.id
              }
            />
          );
        })}
      </div>

      {/* Pagination */}
      {(data?.total_pages ?? 1) > 1 && (
        <div className="flex items-center justify-between pt-[17px]">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!data?.has_prev}
            className="flex items-center gap-[8px] text-[17px] text-primary font-normal leading-[1.47] disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-[0.95]"
          >
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
            {t("app.dashboard.prev")}
          </button>

          <span className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
            {page} / {data?.total_pages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.has_next}
            className="flex items-center gap-[8px] text-[17px] text-primary font-normal leading-[1.47] disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-[0.95]"
          >
            {t("app.dashboard.next")}
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
