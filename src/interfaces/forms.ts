import type { HabitFormData } from "@/app/pages/ui/FormHabitSchema";

// Re-export HabitFormData for backwards compatibility
export type { HabitFormData }

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string; // Solo en el front, no se manda al backend
}

// Eliminado: CreateHabitForm - usar HabitFormData de FormHabitSchema.ts
// export interface CreateHabitForm { ... }
// Use HabitFormData type from FormHabitSchema.ts instead
