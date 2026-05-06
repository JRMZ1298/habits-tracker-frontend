import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useProfileStats } from "../hooks/useProfileStats";
import { SidebarLink } from "./SidebarLink";

export const MainSidebar = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();
  const navigate = useNavigate();
  const level = profile?.level || 1;

  return (
    <aside className="hidden md:flex h-screen w-64 sticky top-0 rounded-r-[2rem] bg-surface-container-low p-6 gap-8 flex-col">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black text-primary-dim font-headline">
          {t("app.dashboard.growthJourney")}
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-label text-shadow-primary-dim opacity-80">
          {level + " " + t("app.dashboard.level")}
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <SidebarLink
          to="/app"
          icon="dashboard"
          translationKey="app.dashboard.dashboard"
        />
        <SidebarLink
          to="/app/habits"
          icon="event_repeat"
          translationKey="app.dashboard.habits"
        />
        <SidebarLink
          to="/app/metrics"
          icon="query_stats"
          translationKey="app.dashboard.statistics"
          fillIcon={true}
        />
        <SidebarLink
          to="/app/settings"
          icon="settings"
          translationKey="app.dashboard.settings"
        />
      </nav>

      <button
        onClick={() => navigate("/app/habits/new")}
        className="mt-auto bg-primary-dim text-on-dark rounded-full py-4 font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-focus"
      >
        {t("app.dashboard.addNewHabit")}
      </button>
    </aside>
  );
};
