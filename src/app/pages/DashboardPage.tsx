import { obtenerPorcentaje } from "@/lib/obtenerPorcentaje";
import { DashboardBentoGrid } from "../components/DashboardBentoGrid";
import { DashboardHabitList } from "../components/DashboardHabitList";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardStatsSidebar } from "../components/DashboardStatsSidebar";
import { useHabits } from "../hooks/useHabits";
import { useTodayLogs } from "../hooks/useTodayLogs";

export const DashboardPage = () => {
  const { data, habits, isLoading, page, setPage } = useHabits(5);
  // IDs de los hábitos para consultar logs de hoy en paralelo
  const habitIds = habits?.map((h) => h.id) ?? [];
  const { completedMap } = useTodayLogs(habitIds);
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const completedPercentage = habits
    ? obtenerPorcentaje(data?.total || 0, completedCount)
    : 0;

  return (
    <>
      <DashboardHeader
        percentageCompleted={completedPercentage}
        currentStreak={12}
        level={33}
      />
      <DashboardBentoGrid
        totalHabits={data?.total || 0}
        completedHabits={completedCount}
        completedPercentage={completedPercentage}
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-5">
        <DashboardHabitList
          habits={habits || []}
          isLoading={isLoading}
          completedMap={completedMap}
          // Paginación
          page={page}
          totalPages={data?.total_pages ?? 1}
          hasNext={data?.has_next ?? false}
          hasPrev={data?.has_prev ?? false}
          onNext={() => setPage((p) => p + 1)}
          onPrev={() => setPage((p) => p - 1)}
        />
        <DashboardStatsSidebar />
      </section>
    </>
  );
};
