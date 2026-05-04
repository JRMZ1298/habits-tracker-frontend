import { useQuery } from "@tanstack/react-query";
import { getWeeklySummary, getYearlySummary } from "@/api/habitsAccions";
import type { WeeklyDay } from "@/interfaces/api";
import type { YearlyMonth } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

export function useWeeklySummary() {
  return useQuery<WeeklyDay[]>({
    queryKey: ["weekly-summary"],
    queryFn: getWeeklySummary,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useAllCompletedToday() {
  return useQuery<number>({
    queryKey: ["today-count"],
    queryFn: () =>
      habitsApi.get("/stats/today-count").then((res) => res.data.completed),
    staleTime: 0, // Siempre fresco — cambia cuando el usuario completa hábitos
    refetchOnWindowFocus: false,
  });
}

export function useYearlySummary() {
  return useQuery<YearlyMonth[]>({
    queryKey: ["yearly-summary"],
    queryFn: getYearlySummary,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
