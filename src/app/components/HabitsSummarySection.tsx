import { useTranslation } from "react-i18next";

export const HabitsSummarySection = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="md:col-span-2 bg-surface-container-low rounded-lg p-8 flex flex-col justify-between min-h-52 relative overflow-hidden">
        <div className="relative z-10">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">
            {t("app.habits.currentFocus")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mt-2 tracking-tight">
            {t("app.habits.consistency")}
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-xs">
            {t("app.habits.streakMessage")}
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUTM8_jV40clu3xUo-GiqTmfZvC071Z1DMiprsXpfQGRTjpcnp5hZ5VRXb5lesTAWoPiTwFZoJu30l9HVnmIgCGT1EUti6b3jwT3Y_S8AVnPyk_6irQ74WA2sNtZpRIVsn0Zd6cegRMhHIQGKxJcfcq1_65ROpIMZVDOMKaEciP3_cvBFG58VapmWCN1ON8pyy7tIzG0vihUTU-YbLOszZhGLs7Ip1bm2aHjsBfhGwRDWMiqoVaVcis9ix7h1kc0y7cH9w3MToVS4"
            alt="botanical illustration"
          />
        </div>
      </div>
      <div className="bg-primary-container rounded-lg p-8 flex flex-col justify-center items-center text-center">
        <span
          className="material-symbols-outlined text-4xl mb-2 text-on-primary-fixed"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          local_fire_department
        </span>
        <div className="text-4xl font-black text-on-primary-fixed">12</div>
        <div className="font-label text-xs uppercase tracking-widest text-on-primary-fixed font-bold">
          {t("app.habits.dayStreak")}
        </div>
      </div>
    </div>
  );
};
