import type { Habit, HabitStats } from "@/interfaces/api";

// Cuántas barras mostrar según la frecuencia
const BARS_BY_FREQUENCY: Record<string, number> = {
  daily: 7, // 7 días de la semana
  weekly: 4, // 4 semanas del mes
};

// Colores por índice — igual que en el dashboard
const CATEGORY_COLORS = [
  "bg-primary-container   text-on-primary-container",
  "bg-secondary-container text-on-secondary-container",
  "bg-tertiary-container  text-on-tertiary-container",
];

export function buildHabitCardProps(
  habit: Habit,
  stats: HabitStats | undefined,
  index: number,
) {
  const totalBars = BARS_BY_FREQUENCY[habit.frequency] ?? 7;
  const completed = stats?.total ?? 0;
  // Cuántas barras están completas — máximo totalBars
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
