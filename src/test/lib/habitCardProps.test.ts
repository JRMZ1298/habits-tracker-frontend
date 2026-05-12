import { buildHabitCardProps } from "@/lib/habitCardProps";
import type { Habit, HabitPeriodProgress } from "@/interfaces/api";

const baseHabit: Habit = {
  id: 1,
  user_id: 1,
  name: "Ejercicio",
  frequency: "daily",
  goal: "30 minutos",
  reminders: ["07:00"],
  icon: "exercise",
  created_at: "2025-01-15T10:00:00Z",
};

const fullProgress: HabitPeriodProgress = {
  habit_id: 1,
  frequency: "daily",
  period_start: "2025-06-01",
  period_end: "2025-06-07",
  completed: 5,
  total_bars: 7,
  completed_bars: 5,
  percentage: 71,
  progress: "5 / 7",
};

describe("buildHabitCardProps", () => {
  it("returns correct props with full progress", () => {
    const result = buildHabitCardProps(baseHabit, fullProgress);

    expect(result.title).toBe("Ejercicio");
    expect(result.icon).toBe("exercise");
    expect(result.category).toBe("30 minutos");
    expect(result.percentage).toBe(71);
    expect(result.completedBars).toBe(5);
    expect(result.totalBars).toBe(7);
    expect(result.progress).toBe("5 / 7");
  });

  it("returns default values when progress is undefined", () => {
    const result = buildHabitCardProps(baseHabit, undefined);

    expect(result.percentage).toBe(0);
    expect(result.completedBars).toBe(0);
    expect(result.totalBars).toBe(7);
    expect(result.progress).toBe("0 / 7");
  });

  it("uses correct default totalBars for weekly frequency", () => {
    const weeklyHabit: Habit = { ...baseHabit, frequency: "weekly" };
    const result = buildHabitCardProps(weeklyHabit, undefined);

    expect(result.totalBars).toBe(4);
  });

  it("uses habit.goal as category when available", () => {
    const result = buildHabitCardProps(baseHabit, undefined);

    expect(result.category).toBe("30 minutos");
  });

  it("uses empty string as category when goal is empty string (?? behavior)", () => {
    const noGoalHabit: Habit = { ...baseHabit, goal: "" };
    const result = buildHabitCardProps(noGoalHabit, undefined);

    expect(result.category).toBe("");
  });

  it("returns empty string as icon when icon is empty string (?? behavior)", () => {
    const noIconHabit: Habit = { ...baseHabit, icon: "" };
    const result = buildHabitCardProps(noIconHabit, undefined);

    expect(result.icon).toBe("");
  });

  it("returns fallback categoryColor for unknown icon", () => {
    const unknownIconHabit: Habit = { ...baseHabit, icon: "unknown" };
    const result = buildHabitCardProps(unknownIconHabit, undefined);

    expect(result.categoryColor).toBe("bg-primary/10 text-primary");
  });

  it("returns correct categoryColor for known icon", () => {
    const result = buildHabitCardProps(baseHabit, undefined);

    expect(result.categoryColor).toBe("bg-emerald-500/15 text-emerald-500");
  });

  it("uses habit.frequency correctly", () => {
    const result = buildHabitCardProps(baseHabit, undefined);

    expect(result.frequency).toBe("daily");
  });
});
