import { useQuery } from "@tanstack/react-query";
import type { WeeklyDay } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

const getWeeklySummary = (): Promise<WeeklyDay[]> =>
  habitsApi.get("/stats/weekly").then((res) => res.data);

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
