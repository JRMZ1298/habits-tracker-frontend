import type {
  BadgeWithProgress,
  Habit,
  HabitWithStatus,
  LogHabitResponse,
  NotificationPreferences,
  PaginatedHabits,
  UserProfileStats,
  WeeklyDay,
  YearlyMonth,
} from "../../interfaces/api";

export const mockUser = {
  name: "Test User",
  email: "test@example.com",
};

export const mockLoginResponse = {
  access_token: "test-token-123",
  token_type: "bearer" as const,
  user_name: "Test User",
  user_email: "test@example.com",
};

export const mockRegisterResponse = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
};

export const mockHabits: Habit[] = [
  {
    id: 1,
    user_id: 1,
    name: "Ejercicio matutino",
    frequency: "daily",
    goal: "30 minutos",
    reminders: ["07:00", "20:00"],
    icon: "dumbbell",
    created_at: "2025-01-15T10:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    name: "Lectura",
    frequency: "daily",
    goal: "20 páginas",
    reminders: ["21:00"],
    icon: "book-open",
    created_at: "2025-01-10T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    name: "Meditar",
    frequency: "weekly",
    goal: "3 veces por semana",
    reminders: ["08:00"],
    icon: "spa",
    created_at: "2025-02-01T10:00:00Z",
  },
];

export const mockPaginatedHabits: PaginatedHabits = {
  habits: mockHabits,
  total: 3,
  page: 1,
  limit: 10,
  total_pages: 1,
  has_next: false,
  has_prev: false,
};

export const mockHabitsWithStatus: HabitWithStatus[] = mockHabits.map(
  (h, i) => ({
    ...h,
    completedToday: i === 0,
  }),
);

export const mockHabitStats = {
  current_streak: 5,
  best_streak: 12,
  total: 45,
};

export const mockLogResponse: LogHabitResponse = {
  mensaje: "Hábito completado",
  current_streak: 6,
  best_streak: 12,
  total: 46,
  new_badges: [],
};

export const mockWeeklySummary: WeeklyDay[] = [
  { date: "2025-06-01", day: "Sun", completed: 3 },
  { date: "2025-06-02", day: "Mon", completed: 5 },
  { date: "2025-06-03", day: "Tue", completed: 4 },
  { date: "2025-06-04", day: "Wed", completed: 6 },
  { date: "2025-06-05", day: "Thu", completed: 2 },
  { date: "2025-06-06", day: "Fri", completed: 5 },
  { date: "2025-06-07", day: "Sat", completed: 4 },
];

export const mockYearlySummary: YearlyMonth[] = [
  { month: 1, label: "Ene", completed: 120 },
  { month: 2, label: "Feb", completed: 98 },
  { month: 3, label: "Mar", completed: 145 },
  { month: 4, label: "Abr", completed: 110 },
  { month: 5, label: "May", completed: 130 },
  { month: 6, label: "Jun", completed: 85 },
  { month: 7, label: "Jul", completed: 0 },
  { month: 8, label: "Ago", completed: 0 },
  { month: 9, label: "Sep", completed: 0 },
  { month: 10, label: "Oct", completed: 0 },
  { month: 11, label: "Nov", completed: 0 },
  { month: 12, label: "Dic", completed: 0 },
];

export const mockProfileStats: UserProfileStats = {
  level: 3,
  total_completed: 235,
  progress_in_level: 5,
  habits_to_next: 5,
  habits_per_level: 10,
  best_current_streak: { streak: 8, habit: "Ejercicio matutino" },
  best_historical_streak: { streak: 15, habit: "Lectura" },
};

export const mockBadges: BadgeWithProgress[] = [
  {
    id: 1,
    key: "first-log",
    name: "Primer registro",
    icon: "🌱",
    description: "Completaste tu primer hábito",
    category: "primeros_pasos",
    required_streak: 1,
    unlocked: true,
    unlocked_at: "2025-01-15T10:00:00Z",
    currentStreak: 1,
  },
  {
    id: 2,
    key: "week-streak",
    name: "Semana completa",
    icon: "🔥",
    description: "Racha de 7 días",
    category: "rachas",
    required_streak: 7,
    unlocked: true,
    unlocked_at: "2025-01-22T10:00:00Z",
    currentStreak: 7,
  },
  {
    id: 3,
    key: "month-streak",
    name: "Mes dedicado",
    icon: "💪",
    description: "Racha de 30 días",
    category: "rachas",
    required_streak: 30,
    unlocked: false,
    unlocked_at: null,
    currentStreak: 8,
  },
];

export const mockNotificationPrefs: NotificationPreferences = {
  daily_reminder: true,
  weekly_summary: false,
};
