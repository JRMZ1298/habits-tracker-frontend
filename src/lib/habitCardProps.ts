import type { Habit, HabitPeriodProgress } from "@/interfaces/api";

const CATEGORY_COLORS: Record<string, string> = {
  favorite: "bg-rose-500/15 text-rose-500",
  directions_run: "bg-orange-500/15 text-orange-500",
  self_improvement: "bg-violet-500/15 text-violet-500",
  exercise: "bg-emerald-500/15 text-emerald-500",
  water_drop: "bg-sky-500/15 text-sky-500",
  menu_book: "bg-amber-500/15 text-amber-500",
  fork_spoon: "bg-red-500/15 text-red-500",
  sleep: "bg-indigo-500/15 text-indigo-400",
};

export function buildHabitCardProps(
  habit: Habit,
  progress: HabitPeriodProgress | undefined, // ← cambia HabitStats por HabitPeriodProgress
) {
  // Si aún no llegó el dato del período, usar valores vacíos
  const completedBars = progress?.completed_bars ?? 0;
  const totalBars =
    progress?.total_bars ?? (habit.frequency === "daily" ? 7 : 4);
  const percentage = progress?.percentage ?? 0;
  const progressText = progress?.progress ?? `0 / ${totalBars}`;

  return {
    icon: habit.icon ?? "task_alt",
    title: habit.name,
    category: habit.goal ?? habit.frequency,
    categoryColor:
      CATEGORY_COLORS[habit.icon ?? ""] ?? "bg-primary/10 text-primary",
    frequency: habit.frequency,
    progress: progressText,
    percentage,
    completedBars,
    totalBars,
  };
}
