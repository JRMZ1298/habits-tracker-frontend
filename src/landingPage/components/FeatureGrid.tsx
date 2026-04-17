import { useTranslation } from "react-i18next";

const baseFeature = {
  id: "stats",
  icon: "insights",
  variant: "large",
  titleKey: "landing.featureGrid.stats.title",
  descriptionKey: "landing.featureGrid.stats.description",
};

const features = [
  baseFeature,
  {
    id: "streaks",
    icon: "workspace_premium",
    variant: "highlight",
    titleKey: "landing.featureGrid.streaks.title",
    descriptionKey: "landing.featureGrid.streaks.description",
  },
  {
    id: "webhooks",
    icon: "webhook",
    titleKey: "landing.featureGrid.webhooks.title",
    descriptionKey: "landing.featureGrid.webhooks.description",
  },
  {
    id: "alerts",
    icon: "notifications_active",
    titleKey: "landing.featureGrid.alerts.title",
    descriptionKey: "landing.featureGrid.alerts.description",
  },
  {
    id: "community",
    icon: "diversity_3",
    titleKey: "landing.featureGrid.community.title",
    descriptionKey: "landing.featureGrid.community.description",
  },
];

export const FeatureGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          {t("landing.featureGrid.title")}
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
          {t("landing.featureGrid.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="md:col-span-2 bg-[#ffffff] rounded-4xl p-10 flex flex-col justify-between overflow-hidden relative shadow-lg shadow-[#006a35]/5">
          <div className="z-10 max-w-sm">
            <span className="material-symbols-outlined text-4xl text-surface-tint mb-6 block">
              insights
            </span>
            <h3 className="text-3xl font-bold mb-4">
              {t(baseFeature.titleKey)}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {t(baseFeature.descriptionKey)}
            </p>
            <button className="text-surface-tint font-bold flex items-center gap-2 hover:gap-4 transition-all">
              {t("landing.featureGrid.exploreStats")}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#6bfe9c]/30 rounded-full blur-3xl" />

          <div className="absolute right-10 bottom-10 hidden md:flex w-1/2 aspect-video bg-[#ffffff] rounded-[1.75rem] shadow-lg p-4 items-end gap-2">
            <div className="w-1/6 bg-[#6bfe9c] h-[33%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[66%] rounded-full" />
            <div className="w-1/6 bg-surface-tint h-full rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[50%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[75%] rounded-full" />
            <div className="w-1/6 bg-[#6bfe9c] h-[33%] rounded-full" />
          </div>
        </article>

        {features.slice(1).map((feature) => (
          <article
            key={feature.id}
            className={`rounded-[1.75rem] p-10 flex flex-col gap-6 ${
              feature.variant === "highlight"
                ? "bg-surface-tint text-[#cdffd4] text-center items-center justify-center"
                : "bg-[#ffffff]"
            } shadow-sm`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                feature.variant === "highlight"
                  ? "bg-[#7deb9b] text-[#003622]"
                  : "bg-[#abd6ff] text-[#006093]"
              }`}
            >
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="text-2xl font-bold">{t(feature.titleKey)}</h3>
            <p
              className={`${
                feature.variant === "highlight"
                  ? "text-[#ebf4ff]"
                  : "text-on-surface-variant"
              }`}
            >
              {t(feature.descriptionKey)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
