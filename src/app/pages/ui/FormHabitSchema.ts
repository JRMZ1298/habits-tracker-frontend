// habitForm.schema.ts
import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),

  frequency: z.enum(["daily", "weekly"]),

  goal: z.string(),

  category: z.string(),

  reminders: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export type HabitFormData = z.infer<typeof habitSchema>;
