import { DashboardBentoGrid } from "../components/DashboardBentoGrid";
import { DashboardHabitList } from "../components/DashboardHabitList";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardStatsSidebar } from "../components/DashboardStatsSidebar";

export const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardBentoGrid />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-5">
        <DashboardHabitList />
        <DashboardStatsSidebar />
      </section>
    </>
  );
};
