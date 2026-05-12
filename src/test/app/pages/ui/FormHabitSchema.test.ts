import { habitSchema } from "@/app/pages/ui/FormHabitSchema";

describe("FormHabitSchema", () => {
  const validData = {
    name: "Ejercicio matutino",
    frequency: "daily" as const,
    goal: "30 minutos",
    category: "exercise",
    reminders: [{ value: "07:00" }],
  };

  it("validates correct data", () => {
    const result = habitSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = habitSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("name");
    }
  });

  it("rejects invalid frequency", () => {
    const result = habitSchema.safeParse({ ...validData, frequency: "monthly" });
    expect(result.success).toBe(false);
  });

  it("accepts weekly frequency", () => {
    const result = habitSchema.safeParse({ ...validData, frequency: "weekly" });
    expect(result.success).toBe(true);
  });

  it("accepts empty reminders array", () => {
    const result = habitSchema.safeParse({ ...validData, reminders: [] });
    expect(result.success).toBe(true);
  });

  it("accepts multiple reminders", () => {
    const result = habitSchema.safeParse({
      ...validData,
      reminders: [{ value: "07:00" }, { value: "20:00" }],
    });
    expect(result.success).toBe(true);
  });

  it("accepts empty strings for optional fields", () => {
    const result = habitSchema.safeParse({
      ...validData,
      goal: "",
      category: "",
    });
    expect(result.success).toBe(true);
  });

  it("infers correct type", () => {
    const data = habitSchema.parse(validData);
    expect(data.frequency).toMatch(/^daily|weekly$/);
  });
});
