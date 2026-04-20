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
  description: string;
  frequency: "daily" | "weekly";
  created_at: string; // FastAPI devuelve fechas como string ISO 8601
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

// ── Respuestas genéricas ──────────────────────────────────────────────────────
export interface MessageResponse {
  mensaje: string;
}

export interface LogHabitResponse extends MessageResponse, HabitStats {}

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
