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

export function getHabitColor(icon: string) {
  return CATEGORY_COLORS[icon ?? "task_alt"] ?? "bg-primary/10 text-primary";
}
