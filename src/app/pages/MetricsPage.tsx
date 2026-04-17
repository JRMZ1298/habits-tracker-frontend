import { useTranslation } from "react-i18next";
import { MetricsStatGrid } from "../components/MetricsStatGrid";

export const MetricsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <header className="mb-12 space-y-2 pt-4 md:pt-0">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-background font-headline">
          {t("app.metrics.title")}
        </h1>
        <p className="text-on-surface-variant font-label text-lg">
          {t("app.metrics.subtitle")}
        </p>
      </header>

      <MetricsStatGrid />
    </>
  );
};
