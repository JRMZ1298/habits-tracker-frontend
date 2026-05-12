import { getHabitColor } from "@/lib/habitColors";

describe("getHabitColor", () => {
  it("returns rose for favorite", () => {
    expect(getHabitColor("favorite")).toBe("bg-rose-500/15 text-rose-500");
  });

  it("returns emerald for exercise", () => {
    expect(getHabitColor("exercise")).toBe("bg-emerald-500/15 text-emerald-500");
  });

  it("returns sky for water_drop", () => {
    expect(getHabitColor("water_drop")).toBe("bg-sky-500/15 text-sky-500");
  });

  it("returns amber for menu_book", () => {
    expect(getHabitColor("menu_book")).toBe("bg-amber-500/15 text-amber-500");
  });

  it("returns indigo for sleep", () => {
    expect(getHabitColor("sleep")).toBe("bg-indigo-500/15 text-indigo-400");
  });

  it("returns orange for directions_run", () => {
    expect(getHabitColor("directions_run")).toBe("bg-orange-500/15 text-orange-500");
  });

  it("returns violet for self_improvement", () => {
    expect(getHabitColor("self_improvement")).toBe("bg-violet-500/15 text-violet-500");
  });

  it("returns red for fork_spoon", () => {
    expect(getHabitColor("fork_spoon")).toBe("bg-red-500/15 text-red-500");
  });

  it("returns fallback for unknown icon", () => {
    expect(getHabitColor("nonexistent")).toBe("bg-primary/10 text-primary");
  });

  it("returns fallback for empty string", () => {
    expect(getHabitColor("")).toBe("bg-primary/10 text-primary");
  });
});
