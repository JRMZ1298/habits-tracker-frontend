import { Outlet } from "react-router";
import { MetricsHeader } from "../components/MetricsHeader";
import { MetricsSidebar } from "../components/MetricsSidebar";

const AppLayout = () => (
  <div className="text-on-background antialiased pb-32 md:pb-0 bg-surface min-h-screen">
    <MetricsHeader />
    <div className="flex pt-20 md:pt-24">
      <MetricsSidebar />
      <main className="flex-1 px-6 pt-6 pb-20 md:px-12 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;
