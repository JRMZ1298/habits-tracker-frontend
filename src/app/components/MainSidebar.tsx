import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useProfileStats } from "../hooks/useProfileStats";
import { SidebarLink } from "./SidebarLink";
import { useEffect } from "react";

interface MainSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const MainSidebar = ({
  isMobileOpen,
  onMobileClose,
}: MainSidebarProps) => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();
  const navigate = useNavigate();
  const level = profile?.level || 1;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        onMobileClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen, onMobileClose]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        data-open={isMobileOpen || undefined}
        className={`
          fixed inset-y-0 left-0 z-40
          flex flex-col gap-8
          bg-surface-container-low
          p-6
          transition-transform duration-300 ease-in-out
          -translate-x-full
          data-[open=true]:translate-x-0

          md:sticky md:top-0 md:z-auto md:translate-x-0
          md:w-20 md:p-4 md:items-center md:h-screen
          md:rounded-r-[2rem]
          lg:w-64 lg:p-6 lg:items-stretch
        `}
        aria-label={t("app.dashboard.sidebar", "Navegación principal")}
      >
        <div className="flex flex-col gap-1 md:items-center lg:items-stretch">
          <h2 className="text-xl font-black text-primary-dim font-headline block md:hidden lg:block">
            <span className="material-symbols-outlined text-primary-dim text-2xl hidden md:block lg:hidden">
              eco
            </span>
            {t("app.dashboard.growthJourney")}
          </h2>
          <p className="text-[10px] text-ink-muted-48 uppercase tracking-widest font-label opacity-80 block md:hidden lg:block">
            {level + " " + t("app.dashboard.level")}
          </p>
        </div>

        <nav className="flex flex-col gap-2 w-full">
          <SidebarLink
            to="/app"
            icon="dashboard"
            translationKey="app.dashboard.dashboard"
            onClick={onMobileClose}
          />
          <SidebarLink
            to="/app/habits"
            icon="event_repeat"
            translationKey="app.dashboard.habits"
            onClick={onMobileClose}
          />
          <SidebarLink
            to="/app/metrics"
            icon="query_stats"
            translationKey="app.dashboard.statistics"
            fillIcon={true}
            onClick={onMobileClose}
          />
          <SidebarLink
            to="/app/settings"
            icon="settings"
            translationKey="app.dashboard.settings"
            onClick={onMobileClose}
          />
        </nav>

        <button
          onClick={() => {
            navigate("/app/habits/new");
            onMobileClose();
          }}
          className="bg-primary-dim text-on-dark rounded-full font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-focus block md:hidden lg:block w-full py-4"
        >
          {t("app.dashboard.addNewHabit")}
        </button>

        <button
          onClick={() => {
            navigate("/app/habits/new");
            onMobileClose();
          }}
          className="bg-primary-dim text-on-dark rounded-full font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-focus hidden md:flex lg:hidden items-center justify-center w-10 h-10 p-0 mx-auto"
          aria-label={t("app.dashboard.addNewHabit")}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </aside>
    </>
  );
};
