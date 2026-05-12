import { http, HttpResponse } from "msw";
import type { HabitPeriodProgress } from "@/interfaces/api";

export const handlers = [
  http.post("*/auth/login", () =>
    HttpResponse.json({
      access_token: "test-token-123",
      token_type: "bearer",
      user_name: "Test User",
      user_email: "test@example.com",
    }),
  ),

  http.post("*/auth/register", () =>
    HttpResponse.json({
      id: 1,
      email: "test@example.com",
      name: "Test User",
    }),
  ),

  http.get("*/habits/", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    return HttpResponse.json({
      habits: [],
      total: 0,
      page,
      limit: 10,
      total_pages: 0,
      has_next: false,
      has_prev: page > 1,
    });
  }),

  http.get("*/habits/:id", () =>
    HttpResponse.json({
      id: 1,
      user_id: 1,
      name: "Ejercicio matutino",
      frequency: "daily",
      goal: "30 minutos",
      reminders: ["07:00"],
      icon: "dumbbell",
      created_at: "2025-01-15T10:00:00Z",
    }),
  ),

  http.post("*/habits/", () =>
    HttpResponse.json(
      {
        id: 4,
        user_id: 1,
        name: "New habit",
        frequency: "daily",
        goal: "30 minutos",
        reminders: ["07:00"],
        icon: "favorite",
        created_at: "2025-06-01T10:00:00Z",
      },
      { status: 201 },
    ),
  ),

  http.put("*/habits/:id", () =>
    HttpResponse.json({
      id: 1,
      user_id: 1,
      name: "Updated habit",
      frequency: "daily",
      goal: "30 minutos",
      reminders: ["07:00"],
      icon: "favorite",
      created_at: "2025-01-15T10:00:00Z",
    }),
  ),

  http.delete("*/habits/:id", () => new HttpResponse(null, { status: 204 })),

  http.get("*/habits/:id/logs/today", () =>
    HttpResponse.json({ completed: false }),
  ),

  http.get("*/habits/:id/logs/stats", () =>
    HttpResponse.json({
      current_streak: 0,
      best_streak: 0,
      total: 0,
    }),
  ),

  http.post("*/habits/:id/logs/", () =>
    HttpResponse.json({
      mensaje: "Hábito completado",
      current_streak: 1,
      best_streak: 3,
      total: 10,
      new_badges: [],
    }),
  ),

  http.get("*/stats/today-count", () =>
    HttpResponse.json({ completed: 0 }),
  ),

  http.get("*/stats/weekly", () =>
    HttpResponse.json([]),
  ),

  http.get("*/stats/yearly", () =>
    HttpResponse.json([]),
  ),

  http.get("*/stats/profile", () =>
    HttpResponse.json({
      level: 1,
      total_completed: 10,
      progress_in_level: 0,
      habits_to_next: 10,
      habits_per_level: 10,
      best_current_streak: { streak: 3, habit: null },
      best_historical_streak: { streak: 5, habit: null },
    }),
  ),

  http.get("*/stats/habit/:id/period-progress", () =>
    HttpResponse.json({
      habit_id: 1,
      frequency: "daily",
      period_start: "2025-06-01",
      period_end: "2025-06-07",
      completed: 5,
      total_bars: 7,
      completed_bars: 5,
      percentage: 71,
      progress: "71%",
    } satisfies HabitPeriodProgress),
  ),

  http.get("*/badges/", () =>
    HttpResponse.json([]),
  ),

  http.get("*/badges/progress", () =>
    HttpResponse.json({}),
  ),

  http.get("*/notifications/me/notifications", () =>
    HttpResponse.json({
      daily_reminder: true,
      weekly_summary: false,
    }),
  ),

  http.put("*/notifications/me/notifications", () =>
    HttpResponse.json({
      daily_reminder: true,
      weekly_summary: false,
    }),
  ),

  http.get("*/recommendation", () =>
    HttpResponse.json({
      title: "Yoga fluido de 15 min",
      image: null,
    }),
  ),

  http.put("*/users/me", () =>
    HttpResponse.json({
      id: 1,
      name: "Updated Name",
      email: "updated@example.com",
    }),
  ),

  http.post("*/users/refresh", () =>
    HttpResponse.json({
      access_token: "refreshed-token-456",
      token_type: "bearer",
    }),
  ),
];
