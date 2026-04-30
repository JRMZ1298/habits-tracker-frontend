import { obtenerPorcentaje } from "@/lib/obtenerPorcentaje";
import { DashboardBentoGrid } from "../components/DashboardBentoGrid";
import { DashboardHabitList } from "../components/DashboardHabitList";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardStatsSidebar } from "../components/DashboardStatsSidebar";
import { useHabits } from "../hooks/useHabits";
import { useTodayLogs } from "../hooks/useTodayLogs";
import { useAllCompletedToday } from "../hooks/useWeeklyLogs";

export const DashboardPage = () => {
  const { data, habits, isLoading, page, setPage } = useHabits(5);

  const pagehabitIds = habits?.map((h) => h.id) ?? [];
  const { completedMap } = useTodayLogs(pagehabitIds);

  const totalHabits = data?.total ?? 0;

  const { data: allTodayCount } = useAllCompletedToday();

  const completedCount = allTodayCount ?? 0;
  const completedPercentage =
    totalHabits > 0 ? obtenerPorcentaje(totalHabits, completedCount) : 0;

  return (
    <>
      <DashboardHeader
        percentageCompleted={completedPercentage}
        currentStreak={12}
        level={33}
      />
      <DashboardBentoGrid
        totalHabits={totalHabits}
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
