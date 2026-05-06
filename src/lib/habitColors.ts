const HABIT_COLORS = [
  { bgColor: "bg-primary/10", textColor: "text-primary" },
  { bgColor: "bg-canvas-parchment", textColor: "text-ink" },
  { bgColor: "bg-surface-tile-1/10", textColor: "text-ink-muted-80" },
  { bgColor: "bg-surface-chip-translucent/40", textColor: "text-ink" },
  { bgColor: "bg-hairline/50", textColor: "text-ink-muted-48" },
];

export function getHabitColor(index: number) {
  return HABIT_COLORS[index % HABIT_COLORS.length];
}
