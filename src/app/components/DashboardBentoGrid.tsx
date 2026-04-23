import { useTranslation } from "react-i18next";

interface Props {
  totalHabits: number;
  completedHabits: number;
  completedPercentage: number;
}

export const DashboardBentoGrid: React.FC<Props> = ({
  totalHabits,
  completedHabits,
  completedPercentage,
}) => {
  const { t } = useTranslation();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (completedPercentage / 100) * circumference;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="md:col-span-2 lg:col-span-2 bg-surface-tint text-on-primary p-8 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-80">
        <div className="relative z-10">
          <span className="text-label text-xs uppercase tracking-[0.2em] opacity-80">
            {t("app.dashboard.dailyProgress")}
          </span>
          <h2 className="text-5xl font-black mt-4">
            {t("app.dashboard.keepBlooming")}
          </h2>
        </div>
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-6xl font-black">{completedPercentage}%</span>
            <span className="text-sm opacity-90">
              {completedHabits +
                t("app.dashboard.habitsDoneP1") +
                totalHabits +
                t("app.dashboard.habitsDoneP2")}
            </span>
          </div>
          <div className="w-32 h-32 relative">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                className="opacity-20"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="transition-all duration-700"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#6bfe9c"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64  bg-[#6bfe9c]/30 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>

      <div className="bg-tertiary-container text-on-tertiary-container p-8 rounded-xl flex flex-col justify-between min-h-80">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined text-4xl">bolt</span>
          <span className="bg-tertiary/20 px-3 py-1 rounded-full text-xs font-bold">
            {t("app.dashboard.active")}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline">
            {t("app.dashboard.energyLevel")}
          </h3>
          <p className="text-sm mt-2 opacity-80">
            {t("app.dashboard.peakWindow")}
          </p>
        </div>
        <div className="h-16 flex items-end gap-1">
          <div className="flex-1 bg-tertiary h-1/2 rounded-t-full" />
          <div className="flex-1 bg-tertiary h-3/4 rounded-t-full" />
          <div className="flex-1 bg-tertiary h-full rounded-t-full" />
          <div className="flex-1 bg-tertiary h-2/3 rounded-t-full" />
          <div className="flex-1 bg-tertiary h-5/6 rounded-t-full" />
        </div>
      </div>

      {/* TODO: SOLO MOSTRAR CUANDO SE TENGA UN HABITO DE BEBER AGUA */}
      <div className="bg-on-secondary-container text-on-secondary p-8 rounded-xl flex flex-col justify-between min-h-80">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined text-4xl">water_drop</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline">
            {t("app.dashboard.hydration")}
          </h3>
          <p className="text-4xl font-black mt-2">
            1.8{" "}
            <span className="text-lg font-medium opacity-70">
              {t("app.dashboard.liters")}
            </span>
          </p>
          <p className="text-sm mt-1 opacity-70">{t("app.dashboard.toGo")}</p>
        </div>
        <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-full font-bold scale-95 active:scale-90 transition-all hover:bg-on-secondary">
          {t("app.dashboard.addCup")}
        </button>
      </div>
    </section>
  );
};
