import { useTranslation } from "react-i18next";

export const DashboardHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-5">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-surface-tint">
          {t("app.dashboard.heading")}
        </h1>
        <p className="text-lg text-outline font-medium">
          {t("app.dashboard.subtitle")}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-surface-container-low px-6 py-4 rounded-lg flex flex-col">
          <span className="text-label text-[10px] uppercase tracking-widest text-outline">
            {t("app.dashboard.currentStreak")}
          </span>
          <span className="text-3xl font-black text-surface-tint">
            {t("app.dashboard.days")}
          </span>
        </div>
        <div className="bg-secondary-container px-6 py-4 rounded-lg flex flex-col">
          <span className="text-label text-[10px] uppercase tracking-widest text-on-secondary-container">
            {t("app.dashboard.level")}
          </span>
          <span className="text-3xl font-black text-on-secondary-container">
            12
          </span>
        </div>
      </div>
    </header>
  );
};
