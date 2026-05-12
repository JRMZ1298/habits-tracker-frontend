import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import {
  useCreateHabit,
  useDeleteHabit,
  useUpdateHabit,
  useLogHabit,
} from "@/app/hooks/useHabits";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import type { HabitFormData } from "@/app/pages/ui/FormHabitSchema";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

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

const habitData: HabitFormData = {
  name: "New habit",
  frequency: "daily",
  goal: "30 minutos",
  category: "favorite",
  reminders: [{ value: "07:00" }],
};

describe("useCreateHabit", () => {
  it("creates habit and returns success", async () => {
    const { result } = renderHook(() => useCreateHabit(), { wrapper: createWrapper() });

    result.current.mutate(habitData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe("New habit");
  });

  it("returns error on failure", async () => {
    server.use(
      http.post("*/habits/", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useCreateHabit(), { wrapper: createWrapper() });

    result.current.mutate(habitData);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useDeleteHabit", () => {
  it("deletes habit and returns success", async () => {
    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("returns error on failure", async () => {
    server.use(
      http.delete("*/habits/:id", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useDeleteHabit(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useUpdateHabit", () => {
  it("updates habit and returns success", async () => {
    const { result } = renderHook(() => useUpdateHabit(1), { wrapper: createWrapper() });

    result.current.mutate(habitData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("returns error on failure", async () => {
    server.use(
      http.put("*/habits/:id", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useUpdateHabit(1), { wrapper: createWrapper() });

    result.current.mutate(habitData);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useLogHabit", () => {
  it("logs habit and returns success", async () => {
    const { result } = renderHook(() => useLogHabit(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.mensaje).toBe("Hábito completado");
  });

  it("calls onNewBadge when new badge is earned", async () => {
    server.use(
      http.post("*/habits/:id/logs/", () =>
        HttpResponse.json({
          mensaje: "Hábito completado",
          current_streak: 7,
          best_streak: 7,
          total: 50,
          new_badges: [{ name: "Week Streak", icon: "fire", description: "7 day streak" }],
        }),
      ),
    );

    const onNewBadge = vi.fn();
    const { result } = renderHook(() => useLogHabit(onNewBadge), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(onNewBadge).toHaveBeenCalledWith({
      name: "Week Streak",
      icon: "fire",
      description: "7 day streak",
    });
  });

  it("returns error on failure", async () => {
    server.use(
      http.post("*/habits/:id/logs/", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useLogHabit(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
