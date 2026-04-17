import { useTranslation } from "react-i18next";

export const MetricsStatGrid = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <section className="md:col-span-4 lg:col-span-4 bg-surface-container-low rounded-lg p-8 flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-label font-bold text-primary">
                {t("app.metrics.weeklyGrowth")}
              </span>
              <h2 className="text-3xl font-bold font-headline">
                {t("app.metrics.consistencyRate")}
              </h2>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-bold">
                {t("app.metrics.overall")}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between h-48 gap-3">
            {[
              { label: "LUN", height: "40%", color: "bg-primary" },
              { label: "MAR", height: "75%", color: "bg-primary" },
              { label: "MIÉ", height: "90%", color: "bg-primary-fixed-dim" },
              { label: "JUE", height: "60%", color: "bg-primary" },
              { label: "VIE", height: "100%", color: "bg-primary" },
              { label: "SÁB", height: "45%", color: "bg-primary-fixed-dim" },
              { label: "DOM", height: "80%", color: "bg-primary" },
            ].map((bar) => (
              <div
                key={bar.label}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <div
                  className="w-full bg-surface-container-high rounded-full relative overflow-hidden"
                  style={{ height: bar.height }}
                >
                  <div
                    className={`absolute bottom-0 w-full ${bar.color} rounded-full transition-all`}
                    style={{ height: "100%" }}
                  />
                </div>
                <span className="text-[10px] font-bold font-label">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-2 lg:col-span-2 bg-surface-tint text-on-primary rounded-lg p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6bfe9c]/30 rounded-full blur-3xl" />
          <div>
            <span className="text-[10px] uppercase tracking-widest font-label font-bold opacity-70">
              {t("app.metrics.momentumMaster")}
            </span>
            <h2 className="text-5xl font-extrabold mt-2 font-headline tracking-tighter">
              42
            </h2>
            <p className="text-xl font-medium opacity-90">
              {t("app.metrics.dayStreak")}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-sm font-label">
              {t("app.metrics.personalBest")}
            </span>
          </div>
        </section>

        <section className="md:col-span-2 lg:col-span-2 bg-secondary-container text-on-secondary-container rounded-lg p-8">
          <span className="text-[10px] uppercase tracking-widest font-label font-bold opacity-70">
            {t("app.metrics.lifetimeEffort")}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-6xl font-extrabold font-headline">1.2k</h2>
          </div>
          <p className="text-lg font-medium opacity-90">
            {t("app.metrics.habitsRooted")}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-on-background border-2 border-secondary-container flex items-center justify-center text-[10px] text-white">
                HR
              </div>
              <div className="w-8 h-8 rounded-full bg-primary border-2 border-secondary-container flex items-center justify-center text-[10px] text-white">
                WK
              </div>
              <div className="w-8 h-8 rounded-full bg-tertiary border-2 border-secondary-container flex items-center justify-center text-[10px] text-white">
                MD
              </div>
            </div>
            <span className="text-xs font-label opacity-70 ml-2">
              {t("app.metrics.disciplines")}
            </span>
          </div>
        </section>

        <section className="md:col-span-4 lg:col-span-4 bg-surface-container-high rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-label font-bold text-on-surface-variant">
                {t("app.metrics.collections")}
              </span>
              <h2 className="text-3xl font-bold font-headline">
                {t("app.metrics.unlockedBadges")}
              </h2>
            </div>
            <button className="text-sm font-bold text-on-surface-variant flex items-center gap-1">
              {t("app.metrics.gallery")}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                icon: "eco",
                label: "Sprout Phase",
                color: "text-on-surface-variant",
              },
              { icon: "sunny", label: "Early Riser", color: "text-tertiary" },
              {
                icon: "water_drop",
                label: "Fluid Flow",
                color: "text-on-secondary-container",
              },
              {
                icon: "lock",
                label: "Forest Lord",
                color: "text-outline",
                locked: true,
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`flex flex-col items-center gap-3 ${badge.locked ? "opacity-40 grayscale" : ""}`}
              >
                <div
                  className={`w-20 h-20 rounded-full ${badge.locked ? "bg-surface-container-low border-2 border-dashed border-outline-variant" : "bg-surface-container-lowest shadow-sm"} flex items-center justify-center group hover:scale-110 transition-all duration-300`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${badge.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                </div>
                <span className="text-xs font-bold font-label text-center">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 bg-tertiary-container text-on-tertiary-container rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-headline">
            {t("app.metrics.newPeak")}
          </h3>
          <p className="font-label opacity-80">
            {t("app.metrics.peakMessage")}
          </p>
        </div>
        <button className="bg-on-tertiary-container text-tertiary-container px-8 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 whitespace-nowrap hover:bg-on-tertiary-fixed">
          {t("app.metrics.optimizeSchedule")}
        </button>
      </section>
    </>
  );
};
