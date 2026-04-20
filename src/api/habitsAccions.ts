import habitsApi from "./habitsApi";
import type {
  Habit,
  HabitLog,
  HabitStats,
  LoginResponse,
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
export const getHabits = (): Promise<Habit[]> =>
  habitsApi.get("/habits/").then((res) => res.data);

export const createHabit = (newHabit: CreateHabitForm) =>
  habitsApi
    .post("/habits/", null, { params: newHabit })
    .then((res) => res.data);

export const deleteHabit = (habitId: number) =>
  habitsApi.delete(`/habits/${habitId}`).then((res) => res.data);

// ── Logs (rachas) ─────────────────────────────────────────────────────────────
export const logHabit = (habitId: number): Promise<HabitLog> =>
  habitsApi.post(`/habits/${habitId}/logs/`).then((res) => res.data);

export const getHabitStats = (habitId: number): Promise<HabitStats> =>
  habitsApi.get(`/habits/${habitId}/logs/stats`).then((res) => res.data);
