const HABIT_COLORS = [
  { bgColor: "bg-primary-container", textColor: "text-surface-tint" },
  { bgColor: "bg-secondary-container", textColor: "text-secondary" },
  { bgColor: "bg-tertiary-container", textColor: "text-tertiary" },
  { bgColor: "bg-error-container", textColor: "text-error" },
  { bgColor: "bg-surface-variant", textColor: "text-on-surface-variant" },
];

export function getHabitColor(index: number) {
  return HABIT_COLORS[index % HABIT_COLORS.length];
}
