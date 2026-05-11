import { http, HttpResponse } from "msw";

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

  http.get("*/habits/", () =>
    HttpResponse.json({
      habits: [],
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0,
      has_next: false,
      has_prev: false,
    }),
  ),

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
    HttpResponse.json({ count: 0 }),
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

  http.get("*/badges/", () =>
    HttpResponse.json([]),
  ),

  http.get("*/badges/progress", () =>
    HttpResponse.json([]),
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
];
