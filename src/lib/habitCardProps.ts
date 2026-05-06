import type { Habit, HabitStats } from "@/interfaces/api";

const BARS_BY_FREQUENCY: Record<string, number> = {
  daily: 7,
  weekly: 4,
};

const CATEGORY_COLORS = [
  "bg-primary/10 text-primary",
  "bg-surface-tile-1/10 text-ink",
  "bg-surface-chip-translucent/50 text-ink",
];

export function buildHabitCardProps(
  habit: Habit,
  stats: HabitStats | undefined,
  index: number,
) {
  const totalBars = BARS_BY_FREQUENCY[habit.frequency] ?? 7;
  const completed = stats?.total ?? 0;
  const completedBars = Math.min(completed, totalBars);
  const percentage =
    totalBars > 0 ? Math.round((completedBars / totalBars) * 100) : 0;

  return {
    icon: habit.icon ?? "task_alt",
    title: habit.name,
    category: habit.goal ?? habit.frequency,
    categoryColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    frequency: habit.frequency,
    progress: `${completedBars} / ${totalBars}`,
    percentage,
    completedBars,
    totalBars,
  };
}
