import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useHabitsStats, useHabitsProgress } from "@/app/hooks/useHabits";
import { useTodayLogs } from "@/app/hooks/useTodayLogs";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import type { HabitStats } from "@/interfaces/api";

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

describe("useHabitsStats", () => {
  it("returns stats map for given habit ids", async () => {
    server.use(
      http.get("*/habits/1/logs/stats", () =>
        HttpResponse.json({ current_streak: 5, best_streak: 10, total: 20 } satisfies HabitStats),
      ),
      http.get("*/habits/2/logs/stats", () =>
        HttpResponse.json({ current_streak: 3, best_streak: 7, total: 15 } satisfies HabitStats),
      ),
    );

    const { result } = renderHook(() => useHabitsStats([1, 2]), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.statsMap[1]?.current_streak).toBe(5);
    expect(result.current.statsMap[2]?.current_streak).toBe(3);
  });

  it("returns empty map for empty ids", () => {
    const { result } = renderHook(() => useHabitsStats([]), { wrapper: createWrapper() });

    expect(result.current.statsMap).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useHabitsProgress", () => {
  it("returns progress map for given habit ids", async () => {
    const { result } = renderHook(() => useHabitsProgress([1]), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.progressMap[1]?.percentage).toBe(71);
    expect(result.current.progressMap[1]?.completed_bars).toBe(5);
  });

  it("returns empty map for empty ids", () => {
    const { result } = renderHook(() => useHabitsProgress([]), { wrapper: createWrapper() });

    expect(result.current.progressMap).toEqual({});
  });
});

describe("useTodayLogs", () => {
  it("returns completed map for given habit ids", async () => {
    server.use(
      http.get("*/habits/1/logs/today", () =>
        HttpResponse.json({ id: 1, habit_id: 1, completed: true, date: "2025-06-01" }),
      ),
      http.get("*/habits/2/logs/today", () =>
        HttpResponse.json({ completed: false }),
      ),
    );

    const { result } = renderHook(() => useTodayLogs([1, 2]), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.completedMap[1]).toBe(true);
    expect(result.current.completedMap[2]).toBe(true);
  });

  it("treats 404 as not completed", async () => {
    server.use(
      http.get("*/habits/1/logs/today", () => new HttpResponse(null, { status: 404 })),
    );

    const { result } = renderHook(() => useTodayLogs([1]), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.completedMap[1]).toBe(false);
  });

  it("returns empty map for empty ids", () => {
    const { result } = renderHook(() => useTodayLogs([]), { wrapper: createWrapper() });

    expect(result.current.completedMap).toEqual({});
  });
});
