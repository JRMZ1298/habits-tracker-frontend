import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import {
  getHabits,
  createHabit,
  deleteHabit,
  logHabit,
  getHabitStats,
  getHabit,
  updateHabit,
} from "../../api/habitsAccions";
import type {
  Habit,
  HabitStats,
  LogHabitResponse,
  PaginatedHabits,
} from "@/interfaces/api";
import type { CreateHabitForm } from "@/interfaces/forms";
import { useState } from "react";

// Clave de cache — TanStack identifica cada query por su queryKey
const HABITS_KEY = ["habits"] as const;

export function useHabits(limit = 5) {
  const [page, setPage] = useState(1);

  const query = useQuery<PaginatedHabits, Error>({
    queryKey: ["habits", page], // Cache separado por página
    queryFn: () => getHabits(page, limit),
    placeholderData: (prev) => prev, // Mantiene datos anteriores mientras carga la página nueva
  });

  return {
    ...query,
    page,
    setPage,
    habits: query.data?.habits ?? [],
  };
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation<Habit, Error, CreateHabitForm>({
    mutationFn: (newHabit) => createHabit(newHabit),
    onSuccess: () => {
      // Invalida el cache de hábitos → TanStack los vuelve a pedir automáticamente
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
  });
}

type LogHabitContext = {
  previous: Habit[] | undefined;
};

// Marcar hábito como completado hoy
export function useLogHabit(onNewBadge?: (badge: NewBadge) => void) {
  const queryClient = useQueryClient();

  return useMutation<LogHabitResponse, Error, number, LogHabitContext>({
    mutationFn: (habitId: number) => logHabit(habitId),

    onSuccess: (data) => {
      // Si hay insignias nuevas, notifica
      if (data.new_badges?.length > 0 && onNewBadge) {
        onNewBadge(data.new_badges[0]);
      }
    },

    // Optimistic update — marca como completado ANTES de que responda el server
    // Si falla, revierte automáticamente
    onMutate: async (habitId) => {
      await queryClient.cancelQueries({ queryKey: HABITS_KEY });
      await queryClient.cancelQueries({ queryKey: ["log-today", habitId] });

      const previous = queryClient.getQueryData<Habit[]>(HABITS_KEY);

      // Actualiza optimistamente el log de hoy
      queryClient.setQueryData(["log-today", habitId], {
        id: 0,
        habit_id: habitId,
        completed: true,
        date: new Date().toISOString().split("T")[0],
      });

      return { previous };
    },

    onError: (_err, habitId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(HABITS_KEY, context.previous);
      }
      // Revierte también el log de hoy
      queryClient.setQueryData(["log-today", habitId], null);
    },

    onSettled: (habitId) => {
      // Refresca los datos reales del server al terminar
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["log-today", habitId] });
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
      queryClient.invalidateQueries({ queryKey: ["today-count"] }); // ← nuevo
      queryClient.invalidateQueries({ queryKey: ["weekly-summary"] });
    },
  });
}

export function useHabitsStats(habitIds: number[]) {
  const results = useQueries({
    queries: habitIds.map((id) => ({
      queryKey: ["stats", id],
      queryFn: () => getHabitStats(id),
      enabled: !!id,
      staleTime: 1000 * 60, // Cache válido 1 minuto
    })),
  });

  // Mapa { habitId: HabitStats }
  const statsMap = habitIds.reduce(
    (acc, id, index) => {
      const data = results[index].data;
      if (data) acc[id] = data;
      return acc;
    },
    {} as Record<number, HabitStats>,
  );

  const isLoading = results.some((r) => r.isLoading);

  return { statsMap, isLoading };
}

//Get Habits para la pagina de Habitos
export function useHabitsGrid(limit = 6) {
  const [page, setPage] = useState(1);

  const query = useQuery<PaginatedHabits, Error>({
    queryKey: ["habits-grid", page],
    queryFn: () => getHabits(page, limit),
    placeholderData: (prev) => prev,
  });

  return {
    ...query,
    page,
    setPage,
    habits: query.data?.habits ?? [],
  };
}

// Obtener un hábito por ID
export function useHabit(id: number | undefined) {
  return useQuery<Habit, Error>({
    queryKey: ["habit", id],
    queryFn: () => getHabit(id!),
    enabled: !!id, // Solo ejecuta si hay un id
  });
}

// Actualizar hábito
export function useUpdateHabit(id: number) {
  const queryClient = useQueryClient();

  return useMutation<Habit, Error, CreateHabitForm>({
    mutationFn: (data) => updateHabit(id, data),
    onSuccess: (updated) => {
      // Actualiza el cache del hábito individual
      queryClient.setQueryData(["habit", id], updated);
      // Invalida la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
  });
}
