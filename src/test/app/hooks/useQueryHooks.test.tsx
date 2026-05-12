import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useProfileStats } from "@/app/hooks/useProfileStats";
import { useBadges, useBadgesProgress } from "@/app/hooks/useBadges";
import {
  useWeeklySummary,
  useAllCompletedToday,
  useYearlySummary,
} from "@/app/hooks/useWeeklyLogs";
import {
  useNotificationPreferences,
  useUpdateNotifications,
} from "@/app/hooks/useNotifications";
import { useRecommendation } from "@/app/hooks/useRecommendation";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  });
  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useProfileStats", () => {
  it("returns profile stats on success", async () => {
    const { result } = renderHook(() => useProfileStats(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.level).toBe(1);
    expect(result.current.data?.total_completed).toBe(10);
  });

  it("returns error on failure", async () => {
    server.use(
      http.get("*/stats/profile", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useProfileStats(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useBadges", () => {
  it("returns badges on success", async () => {
    server.use(
      http.get("*/badges/", () =>
        HttpResponse.json([
          { id: 1, key: "first-log", name: "Primer registro", icon: "🌱", description: "test", category: "primeros_pasos", required_streak: 1, unlocked: true, unlocked_at: "2025-01-15T10:00:00Z" },
        ]),
      ),
    );

    const { result } = renderHook(() => useBadges(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data![0].name).toBe("Primer registro");
  });
});

describe("useBadgesProgress", () => {
  it("returns badges progress on success", async () => {
    server.use(
      http.get("*/badges/progress", () =>
        HttpResponse.json({ "first-log": 1, "week-streak": 5 }),
      ),
    );

    const { result } = renderHook(() => useBadgesProgress(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual({ "first-log": 1, "week-streak": 5 });
  });
});

describe("useWeeklySummary", () => {
  it("returns weekly summary on success", async () => {
    server.use(
      http.get("*/stats/weekly", () =>
        HttpResponse.json([
          { date: "2025-06-01", day: "Sun", completed: 3 },
          { date: "2025-06-02", day: "Mon", completed: 5 },
        ]),
      ),
    );

    const { result } = renderHook(() => useWeeklySummary(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data![0].completed).toBe(3);
  });
});

describe("useAllCompletedToday", () => {
  it("returns today count on success", async () => {
    server.use(
      http.get("*/stats/today-count", () =>
        HttpResponse.json({ completed: 5 }),
      ),
    );

    const { result } = renderHook(() => useAllCompletedToday(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe(5);
  });
});

describe("useYearlySummary", () => {
  it("returns yearly summary on success", async () => {
    server.use(
      http.get("*/stats/yearly", () =>
        HttpResponse.json([
          { month: 1, label: "Ene", completed: 120 },
          { month: 2, label: "Feb", completed: 98 },
        ]),
      ),
    );

    const { result } = renderHook(() => useYearlySummary(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data![0].completed).toBe(120);
  });
});

describe("useNotificationPreferences", () => {
  it("returns notification prefs on success", async () => {
    const { result } = renderHook(() => useNotificationPreferences(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.daily_reminder).toBe(true);
    expect(result.current.data?.weekly_summary).toBe(false);
  });
});

describe("useUpdateNotifications", () => {
  it("updates notification preferences", async () => {
    const { result } = renderHook(() => useUpdateNotifications(), { wrapper: createWrapper() });

    result.current.mutate({ daily_reminder: false, weekly_summary: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("returns error on failure", async () => {
    server.use(
      http.put("*/notifications/me/notifications", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useUpdateNotifications(), { wrapper: createWrapper() });

    result.current.mutate({ daily_reminder: false, weekly_summary: true });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useRecommendation", () => {
  it("returns recommendation on success", async () => {
    const { result } = renderHook(() => useRecommendation(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.title).toBe("Yoga fluido de 15 min");
  });
});
