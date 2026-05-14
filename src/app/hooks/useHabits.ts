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
import type { HabitFormData } from "@/app/pages/ui/FormHabitSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { HabitPeriodProgress } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

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

  return useMutation<Habit, Error, HabitFormData>({
    mutationFn: (newHabit) => createHabit(newHabit),
    onSuccess: () => {
      toast.success("¡Hábito creado exitosamente!");
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el hábito");
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: number) => deleteHabit(habitId),
    onSuccess: () => {
      toast.success("Hábito eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar el hábito");
    },
  });
}

type LogHabitContext = {
  previous: Habit[] | undefined;
};

interface NewBadge {
  name: string;
  icon: string;
  description: string;
}

// Marcar hábito como completado hoy
export function useLogHabit(onNewBadge?: (badge: NewBadge) => void) {
  const queryClient = useQueryClient();

  return useMutation<LogHabitResponse, Error, number, LogHabitContext>({
    mutationFn: (habitId: number) => logHabit(habitId),

    onSuccess: (data) => {
      toast.success("¡Hábito completado hoy!");
      // Si hay insignias nuevas, notifica
      if (data.new_badges?.length > 0 && onNewBadge) {
        onNewBadge(data.new_badges[0]);
      }
    },

    onError: (error, habitId, context) => {
      toast.error(error.message || "Error al completar el hábito");
      if (context?.previous) {
        queryClient.setQueryData(HABITS_KEY, context.previous);
      }
      // Revierte también el log de hoy
      queryClient.setQueryData(["log-today", habitId], null);
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

    onSettled: (habitId) => {
      // Refresca los datos reales del server al terminar
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
      queryClient.invalidateQueries({ queryKey: ["log-today", habitId] });
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      queryClient.invalidateQueries({ queryKey: ["badges-progress"] });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
      queryClient.invalidateQueries({ queryKey: ["today-count"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-summary"] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      queryClient.invalidateQueries({ queryKey: ["yearly-summary"] });
      queryClient.invalidateQueries({ queryKey: ["habit-progress"] });
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
  const [search, setSearch] = useState("");

  // Debounce — espera 400ms después de que el usuario deja de escribir
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Volver a página 1 al buscar
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const query = useQuery<PaginatedHabits, Error>({
    queryKey: ["habits-grid", page, debouncedSearch],
    queryFn: () => getHabits(page, limit, debouncedSearch),
    placeholderData: (prev) => prev,
  });

  return {
    ...query,
    page,
    setPage,
    search,
    setSearch,
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

  return useMutation<Habit, Error, HabitFormData>({
    mutationFn: (data) => updateHabit(id, data),
    onSuccess: (updated) => {
      toast.success("¡Hábito actualizado exitosamente!");
      // Actualiza el cache del hábito individual
      queryClient.setQueryData(["habit", id], updated);
      // Invalida la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habits-grid"] });
    },
    onError: (error) => {
      toast.error(error.message || "Error al actualizar el hábito");
    },
  });
}

const getHabitPeriodProgress = (
  habitId: number,
): Promise<HabitPeriodProgress> =>
  habitsApi.get(`/stats/habit/${habitId}/period-progress`).then((r) => r.data);

export function useHabitsProgress(habitIds: number[]) {
  const results = useQueries({
    queries: habitIds.map((id) => ({
      queryKey: ["habit-progress", id],
      queryFn: () => getHabitPeriodProgress(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 2,
    })),
  });

  const progressMap = habitIds.reduce(
    (acc, id, index) => {
      const data = results[index].data;
      if (data) acc[id] = data;
      return acc;
    },
    {} as Record<number, HabitPeriodProgress>,
  );

  const isLoading = results.some((r) => r.isLoading);

  return { progressMap, isLoading };
}
