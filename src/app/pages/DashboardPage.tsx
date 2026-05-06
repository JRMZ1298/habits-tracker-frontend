import { obtenerPorcentaje } from "@/lib/obtenerPorcentaje";
import { DashboardBentoGrid } from "../components/DashboardBentoGrid";
import { DashboardHabitList } from "../components/DashboardHabitList";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardStatsSidebar } from "../components/DashboardStatsSidebar";
import { useHabits } from "../hooks/useHabits";
import { useTodayLogs } from "../hooks/useTodayLogs";
import { useAllCompletedToday } from "../hooks/useWeeklyLogs";
import { useProfileStats } from "../hooks/useProfileStats";

export const DashboardPage = () => {
  const { data, habits, isLoading, page, setPage } = useHabits(5);

  const pagehabitIds = habits?.map((h) => h.id) ?? [];
  const { completedMap } = useTodayLogs(pagehabitIds);

  const totalHabits = data?.total ?? 0;

  const { data: allTodayCount } = useAllCompletedToday();

  const completedCount = allTodayCount ?? 0;
  const completedPercentage =
    totalHabits > 0 ? obtenerPorcentaje(totalHabits, completedCount) : 0;

  const { data: profile, isLoading: profileStatsLoading } = useProfileStats();

  if (profileStatsLoading) {
    return (
      <div className="space-y-[80px]">
        <div className="h-36 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:col-span-2 bg-canvas animate-pulse h-72" />
          <div className="bg-surface-tile-1 animate-pulse h-72" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-canvas rounded-lg animate-pulse h-20" />
            <div className="bg-canvas rounded-lg animate-pulse h-20" />
            <div className="bg-canvas rounded-lg animate-pulse h-20" />
          </div>
          <div className="bg-canvas rounded-lg animate-pulse h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative space-y-[48px]">
        <DashboardHeader
          percentageCompleted={completedPercentage}
          currentStreak={profile?.best_current_streak.streak ?? 0}
          level={profile?.level ?? 1}
        />

        <DashboardBentoGrid
          totalHabits={totalHabits}
          completedHabits={completedCount}
          completedPercentage={completedPercentage}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardHabitList
            habits={habits || []}
            isLoading={isLoading}
            completedMap={completedMap}
            page={page}
            totalPages={data?.total_pages ?? 1}
            hasNext={data?.has_next ?? false}
            hasPrev={data?.has_prev ?? false}
            onNext={() => setPage((p) => p + 1)}
            onPrev={() => setPage((p) => p - 1)}
          />
          <DashboardStatsSidebar />
        </section>
      </div>
    </div>
  );
};
