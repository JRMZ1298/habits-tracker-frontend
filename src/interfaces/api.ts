// ── Auth ──────────────────────────────────────────────────────────────────────
export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
  user_name: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  name: string;
}

// ── Hábitos ───────────────────────────────────────────────────────────────────
export interface Habit {
  id: number;
  user_id: number;
  name: string;
  frequency: "daily" | "weekly";
  goal: string;
  reminders: string[];
  icon: string;
  created_at: string;
}

export interface PaginatedHabits {
  habits: Habit[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface HabitLog {
  id: number;
  habit_id: number;
  completed: boolean;
  date: string; // "2024-01-15" — solo fecha, sin hora
}

export interface HabitStats {
  current_streak: number;
  best_streak: number;
  total: number;
}

export interface HabitWithStatus extends Habit {
  completedToday: boolean; // lo calculamos en el frontend
}

// ── Respuestas genéricas ──────────────────────────────────────────────────────
export interface MessageResponse {
  mensaje: string;
}

export interface LogHabitResponse extends MessageResponse, HabitStats {
  new_badges: { name: string; icon: string; description: string }[];
}

// ── Errores de FastAPI ────────────────────────────────────────────────────────
// FastAPI devuelve los errores en este formato estándar
export interface FastAPIError {
  detail: string | ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[]; // Dónde ocurrió el error: ["body", "email"]
  msg: string; // "field required"
  type: string; // "missing"
}

// ---------Badges------------------------------------------------------------------

export interface Badge {
  id: number;
  key: string;
  name: string;
  icon: string;
  description: string | null;
  category: string;
  required_streak: number;
  unlocked: boolean;
  unlocked_at: string | null;
}

// El badge ahora incluye el progreso hacia él
export interface BadgeWithProgress extends Badge {
  currentStreak: number; // lo calculamos en el frontend
}
