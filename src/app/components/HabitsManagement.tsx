import { useTranslation } from "react-i18next";

export const HabitsManagement = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          {t("app.habits.activeHabits")}
        </h3>
        <p className="text-on-surface-variant">{t("app.habits.description")}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-surface-container-high px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined text-sm text-on-primary-fixed">
            filter_list
          </span>
          {t("app.habits.filter")}
        </button>
        <button className="md:hidden bg-on-background text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-surface-tint">
          <span className="material-symbols-outlined text-sm">add</span>
          {t("app.habits.newHabit")}
        </button>
      </div>
    </div>
  );
};
