import habitsApi from "@/api/habitsApi";
import type { HabitLog } from "@/interfaces/api";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

// Trae el log de HOY para un hábito específico
const getTodayLog = (habitId: number): Promise<HabitLog | null> => {
  //   const today = new Date().toISOString().split("T")[0]; // "2024-01-15"
  return habitsApi
    .get(`/habits/${habitId}/logs/today`)
    .then((res) => res.data)
    .catch((error) => {
      // 404 = no completado hoy — es un caso válido, no un error real
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      // Cualquier otro error (401, 500...) sí lo relanzamos
      throw error;
    });
};

export function useTodayLogs(habitIds: number[]) {
  const results = useQueries({
    queries: habitIds.map((id) => ({
      queryKey: ["log-today", id],
      queryFn: () => getTodayLog(id),
      enabled: !!id,
      retry: (failureCount: number, error: unknown) => {
        // No reintentar si es 404 — es un resultado válido
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false, // ← no refetchear al volver a la ventana
      staleTime: 1000 * 60 * 5,
    })),
  });

  const completedMap = habitIds.reduce(
    (acc, id, index) => {
      acc[id] = results[index].data != null;
      return acc;
    },
    {} as Record<number, boolean>,
  );

  const isLoading = results.some((r) => r.isLoading);

  return { completedMap, isLoading };
}
