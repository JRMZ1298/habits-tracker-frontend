import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const features = [
  {
    id: "stats",
    icon: "insights",
    titleKey: "landing.featureGrid.stats.title",
    descriptionKey: "landing.featureGrid.stats.description",
  },
  {
    id: "streaks",
    icon: "workspace_premium",
    titleKey: "landing.featureGrid.streaks.title",
    descriptionKey: "landing.featureGrid.streaks.description",
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
    <div>
      {/* Dark tile 1 - Stats (large feature) */}
      <section className="bg-surface-tile-1 py-[80px]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-[48px]">
            <span className="material-symbols-outlined text-[40px] text-body-muted mb-[17px] block">
              {features[0].icon}
            </span>
            <h2
              className="text-[40px] md:text-[56px] font-semibold text-on-dark leading-[1.1] tracking-[-0.28px] mb-[12px]"
            >
              {t(features[0].titleKey)}
            </h2>
            <p
              className="text-[21px] font-normal text-body-muted leading-[1.47] max-w-[680px] mx-auto"
            >
              {t(features[0].descriptionKey)}
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/app/metrics"
              className="text-primary-on-dark text-[17px] font-normal leading-[1.47] tracking-[-0.374px] hover:underline"
            >
              {t("landing.featureGrid.exploreStats")}
              <span className="material-symbols-outlined text-[17px] align-middle ml-[4px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Light tile - Streaks */}
      <section className="bg-canvas py-[80px]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-[48px]">
            <span className="material-symbols-outlined text-[40px] text-ink mb-[17px] block">
              {features[1].icon}
            </span>
            <h2
              className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1] tracking-[-0.28px] mb-[12px]"
            >
              {t(features[1].titleKey)}
            </h2>
            <p
              className="text-[21px] font-normal text-ink leading-[1.47] max-w-[680px] mx-auto"
            >
              {t(features[1].descriptionKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Parchment tile - Alerts */}
      <section className="bg-canvas-parchment py-[80px]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-[48px]">
            <span className="material-symbols-outlined text-[40px] text-ink mb-[17px] block">
              {features[2].icon}
            </span>
            <h2
              className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1] tracking-[-0.28px] mb-[12px]"
            >
              {t(features[2].titleKey)}
            </h2>
            <p
              className="text-[21px] font-normal text-ink leading-[1.47] max-w-[680px] mx-auto"
            >
              {t(features[2].descriptionKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Dark tile 2 - Community */}
      <section className="bg-surface-tile-2 py-[80px]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-[48px]">
            <span className="material-symbols-outlined text-[40px] text-body-muted mb-[17px] block">
              {features[3].icon}
            </span>
            <h2
              className="text-[40px] md:text-[56px] font-semibold text-on-dark leading-[1.1] tracking-[-0.28px] mb-[12px]"
            >
              {t(features[3].titleKey)}
            </h2>
            <p
              className="text-[21px] font-normal text-body-muted leading-[1.47] max-w-[680px] mx-auto"
            >
              {t(features[3].descriptionKey)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
