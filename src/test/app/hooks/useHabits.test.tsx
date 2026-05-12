import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useHabits, useHabitsGrid, useHabit } from "@/app/hooks/useHabits";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { mockHabits } from "@/test/mocks/apiResponse";

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

describe("useHabits", () => {
  it("returns loading state initially", () => {
    const { result } = renderHook(() => useHabits(5), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.habits).toEqual([]);
  });

  it("returns habits on success", async () => {
    server.use(
      http.get("*/habits/", () =>
        HttpResponse.json({
          habits: mockHabits,
          total: 3,
          page: 1,
          limit: 5,
          total_pages: 1,
          has_next: false,
          has_prev: false,
        }),
      ),
    );

    const { result } = renderHook(() => useHabits(5), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.habits).toHaveLength(3);
    expect(result.current.habits[0].name).toBe("Ejercicio matutino");
    expect(result.current.data?.total).toBe(3);
  });

  it("returns error on failure", async () => {
    server.use(
      http.get("*/habits/", () => HttpResponse.error()),
    );

    const { result } = renderHook(() => useHabits(5), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it("supports pagination state", async () => {
    const { result } = renderHook(() => useHabits(5), { wrapper: createWrapper() });

    expect(result.current.page).toBe(1);
    await act(async () => { result.current.setPage(2); });
    expect(result.current.page).toBe(2);
  });

  it("returns empty array when data is undefined", () => {
    const { result } = renderHook(() => useHabits(5), { wrapper: createWrapper() });
    expect(result.current.habits).toEqual([]);
  });
});

describe("useHabitsGrid", () => {
  it("returns habits grid data", async () => {
    server.use(
      http.get("*/habits/", () =>
        HttpResponse.json({
          habits: mockHabits.slice(0, 2),
          total: 2,
          page: 1,
          limit: 6,
          total_pages: 1,
          has_next: false,
          has_prev: false,
        }),
      ),
    );

    const { result } = renderHook(() => useHabitsGrid(6), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.habits).toHaveLength(2);
    expect(result.current.habits[0].name).toBe("Ejercicio matutino");
  });

  it("supports grid pagination state", async () => {
    const { result } = renderHook(() => useHabitsGrid(6), { wrapper: createWrapper() });

    expect(result.current.page).toBe(1);
    await act(async () => { result.current.setPage(2); });
    expect(result.current.page).toBe(2);
  });
});

describe("useHabit", () => {
  it("fetches a single habit by id", async () => {
    const { result } = renderHook(() => useHabit(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.name).toBe("Ejercicio matutino");
    expect(result.current.data?.frequency).toBe("daily");
  });

  it("is disabled when id is undefined", () => {
    const { result } = renderHook(() => useHabit(undefined), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
