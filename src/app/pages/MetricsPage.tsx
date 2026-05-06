import { useTranslation } from "react-i18next";
import { MetricsStatGrid } from "../components/MetricsStatGrid";
import { useProfileStats } from "../hooks/useProfileStats";

export const MetricsPage = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfileStats();

  return (
    <div className="space-y-[48px]">
      <header className="space-y-[12px] pt-[32px]">
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1]"
          style={{ letterSpacing: "-0.28px" }}
        >
          {t("app.metrics.title")}
        </h1>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
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
    </div>
  );
};
