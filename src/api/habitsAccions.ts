import habitsApi from "./habitsApi";
import type {
  Habit,
  HabitStats,
  LogHabitResponse,
  LoginResponse,
  PaginatedHabits,
  RegisterResponse,
  WeeklyDay,
  YearlyMonth,
} from "@/interfaces/api";
import type { RegisterForm } from "@/interfaces/forms";
import type { HabitFormData } from "@/app/pages/ui/FormHabitSchema";

// ── Auth ─────────────────────────────────────────────────────────────────────
export const registerUser = (
  newUser: RegisterForm,
): Promise<RegisterResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...rest } = newUser;
  return habitsApi
    .post("/auth/register", null, { params: rest })
    .then((res) => res.data);
};

export const loginUser = (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // FastAPI espera form-urlencoded en el login (OAuth2PasswordRequestForm)
  const form = new URLSearchParams();
  form.append("username", email); // FastAPI usa 'username', nosotros mandamos el email
  form.append("password", password);

  return habitsApi
    .post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => res.data);
};

// ── Hábitos ───────────────────────────────────────────────────────────────────
export const getHabits = (page = 1, limit = 5): Promise<PaginatedHabits> =>
  habitsApi
    .get("/habits/", { params: { page, limit } })
    .then((res) => res.data);

export const createHabit = (newHabit: HabitFormData) =>
  habitsApi
    .post("/habits/", {
      name: newHabit.name,
      frequency: newHabit.frequency,
      goal: newHabit.goal,
      reminders: newHabit.reminders.map((r) => r.value) ?? [],
      icon: newHabit.category ?? null,
    })
    .then((res) => res.data);

export const deleteHabit = (habitId: number) =>
  habitsApi.delete(`/habits/${habitId}`).then((res) => res.data);

export const getHabit = (id: number): Promise<Habit> =>
  habitsApi.get(`/habits/${id}`).then((res) => res.data);

export const updateHabit = (
  id: number,
  data: HabitFormData,
): Promise<Habit> =>
  habitsApi
    .put(`/habits/${id}`, {
      name: data.name,
      frequency: data.frequency ?? "daily",
      goal: data.goal ?? null,
      reminders: data.reminders.map((r) => r.value) ?? [],
      icon: data.category ?? null,
    })
    .then((res) => res.data);

// ── Logs (rachas) ─────────────────────────────────────────────────────────────
export const logHabit = (habitId: number): Promise<LogHabitResponse> =>
  habitsApi.post(`/habits/${habitId}/logs/`).then((res) => res.data);

export const getHabitStats = (habitId: number): Promise<HabitStats> =>
  habitsApi.get(`/habits/${habitId}/logs/stats`).then((res) => res.data);

export const getWeeklySummary = (): Promise<WeeklyDay[]> =>
  habitsApi.get("/stats/weekly").then((res) => res.data);

export const getYearlySummary = (): Promise<YearlyMonth[]> =>
  habitsApi.get("/stats/yearly").then((res) => res.data);
