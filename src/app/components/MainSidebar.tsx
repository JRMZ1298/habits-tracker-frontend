import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";

export const MainSidebar = () => {
  const { t } = useTranslation();
  const pathname = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex h-screen w-64 sticky top-0 rounded-r-[2rem] bg-surface-container-low p-6 gap-8 flex-col">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black text-primary-dim font-headline">
          {t("app.dashboard.growthJourney")}
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-label text-shadow-primary-dim opacity-80">
          {t("app.dashboard.levelLabel")}
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          className={`flex items-center gap-3 px-4 py-3 text-shadow-primary-dim rounded-full font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95 ${pathname.pathname === "/app" ? "bg-surface-container-lowest shadow-sm" : "opacity-80"}`}
          to="/app"
        >
          <span className="material-symbols-outlined">dashboard</span>
          {t("app.dashboard.dashboard")}
        </Link>
        <Link
          className={`flex items-center gap-3 px-4 py-3 text-shadow-primary-dim rounded-full font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95 ${pathname.pathname === "/app/habits" ? "bg-surface-container-lowest shadow-sm" : "opacity-80"}`}
          to="/app/habits"
        >
          <span className="material-symbols-outlined">event_repeat</span>
          {t("app.dashboard.habits")}
        </Link>
        <Link
          className={`flex items-center gap-3 px-4 py-3 text-shadow-primary-dim rounded-full  font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95 ${pathname.pathname === "/app/metrics" ? "bg-surface-container-lowest shadow-sm" : "opacity-80"}`}
          to="/app/metrics"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            query_stats
          </span>
          {t("app.dashboard.statistics")}
        </Link>
        <Link
          className={`flex items-center gap-3 px-4 py-3 text-shadow-primary-dim rounded-full font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95 ${pathname.pathname === "/app/settings" ? "bg-surface-container-lowest shadow-sm" : "opacity-80"}`}
          to="/app/settings"
        >
          <span className="material-symbols-outlined">settings</span>
          {t("app.dashboard.settings")}
        </Link>
      </nav>

      <button
        onClick={() => navigate("/app/habits/newHabit")}
        className={`mt-auto bg-primary-dim text-white rounded-full py-4 font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 hover:bg-on-primary-fixed`}
      >
        {t("app.dashboard.addNewHabit")}
      </button>
    </aside>
  );
};
