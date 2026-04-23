import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHabits,
  createHabit,
  deleteHabit,
  logHabit,
  getHabitStats,
} from "../../api/habitsAccions";
import type {
  Habit,
  HabitLog,
  HabitStats,
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
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
  });
}

type LogHabitContext = {
  previous: Habit[] | undefined;
};

// Marcar hábito como completado hoy
export function useLogHabit() {
  const queryClient = useQueryClient();

  return useMutation<HabitLog, Error, number, LogHabitContext>({
    mutationFn: (habitId: number) => logHabit(habitId),

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
    },
  });
}

// Stats de un hábito específico
export function useHabitStats(habitId: number) {
  return useQuery<HabitStats>({
    queryKey: ["stats", habitId],
    queryFn: () => getHabitStats(habitId),
    enabled: !!habitId,
  });
}
