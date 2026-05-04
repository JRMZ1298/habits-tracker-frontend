import { useTranslation } from "react-i18next";
import { MetricsStatGrid } from "../components/MetricsStatGrid";
import { useProfileStats } from "../hooks/useProfileStats";

export const MetricsPage = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();

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

      <MetricsStatGrid
        best_streak={
          profile?.best_historical_streak ?? { streak: 0, habit: null }
        }
        total_completed={profile?.total_completed ?? 0}
        level={profile?.level ?? 1}
        progress_in_level={profile?.progress_in_level ?? 0}
        habits_to_next={profile?.habits_to_next ?? 10}
        habits_per_level={profile?.habits_per_level ?? 10}
      />
    </>
  );
};
