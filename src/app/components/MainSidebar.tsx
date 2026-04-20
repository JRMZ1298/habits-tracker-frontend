import { useTranslation } from "react-i18next";

export const MainSidebar = () => {
  const { t } = useTranslation();

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
        <a
          className="flex items-center gap-3 px-4 py-3 text-shadow-primary-dim opacity-80 font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          {t("app.dashboard.dashboard")}
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 text-shadow-primary-dim opacity-80 font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">event_repeat</span>
          {t("app.dashboard.habits")}
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 bg-surface-container-lowest text-shadow-primary-dim rounded-full shadow-sm font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            query_stats
          </span>
          {t("app.dashboard.statistics")}
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 text-shadow-primary-dim opacity-80 font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          {t("app.dashboard.settings")}
        </a>
      </nav>

      <button className="mt-auto bg-primary-dim text-white rounded-full py-4 font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 hover:bg-on-primary-fixed">
        {t("app.dashboard.addNewHabit")}
      </button>
    </aside>
  );
};
