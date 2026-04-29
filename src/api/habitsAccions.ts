import habitsApi from "./habitsApi";
import type {
  Habit,
  HabitStats,
  LogHabitResponse,
  LoginResponse,
  PaginatedHabits,
  RegisterResponse,
} from "@/interfaces/api";
import type { CreateHabitForm, RegisterForm } from "@/interfaces/forms";

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

export const createHabit = (newHabit: CreateHabitForm) =>
  habitsApi
    .post("/habits/", {
      name: newHabit.name,
      frequency: newHabit.frequency,
      goal: newHabit.goal,
      reminders: newHabit.reminders ?? [],
      icon: newHabit.category ?? null,
    })
    .then((res) => res.data);

export const deleteHabit = (habitId: number) =>
  habitsApi.delete(`/habits/${habitId}`).then((res) => res.data);

export const getHabit = (id: number): Promise<Habit> =>
  habitsApi.get(`/habits/${id}`).then((res) => res.data);

export const updateHabit = (
  id: number,
  data: CreateHabitForm,
): Promise<Habit> =>
  habitsApi
    .put(`/habits/${id}`, {
      name: data.name,
      frequency: data.frequency ?? "daily",
      goal: data.goal ?? null,
      reminders: data.reminders ?? [],
      icon: data.category ?? null,
    })
    .then((res) => res.data);

// ── Logs (rachas) ─────────────────────────────────────────────────────────────
export const logHabit = (habitId: number): Promise<LogHabitResponse> =>
  habitsApi.post(`/habits/${habitId}/logs/`).then((res) => res.data);

export const getHabitStats = (habitId: number): Promise<HabitStats> =>
  habitsApi.get(`/habits/${habitId}/logs/stats`).then((res) => res.data);
