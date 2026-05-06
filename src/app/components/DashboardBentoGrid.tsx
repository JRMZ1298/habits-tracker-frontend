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
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completedPercentage / 100) * circumference;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Daily Progress - Light Tile */}
      <div className="bg-canvas p-[48px] md:p-[80px] flex flex-col justify-between min-h-[320px]">
        <div className="space-y-[12px]">
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            {t("app.dashboard.dailyProgress")}
          </span>
          <h2
            className="text-[40px] font-semibold text-ink leading-[1.1]"
            style={{ letterSpacing: "-0.28px" }}
          >
            {t("app.dashboard.keepBlooming")}
          </h2>
        </div>

        <div className="flex items-end justify-between mt-[48px]">
          <div className="space-y-[4px]">
            <span
              className="text-[56px] font-semibold text-ink leading-[1.07]"
              style={{ letterSpacing: "-0.28px" }}
            >
              {completedPercentage}
              <span className="text-[28px] text-ink-muted-48 font-normal">
                %
              </span>
            </span>
            <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
              {completedHabits}
              {t("app.dashboard.habitsDoneP1")}
              {totalHabits}
              {t("app.dashboard.habitsDoneP2")}
            </p>
          </div>

          <div className="w-[120px] h-[120px] relative">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-hairline"
                cx="50"
                cy="50"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="transition-all duration-700"
                cx="50"
                cy="50"
                fill="transparent"
                r={radius}
                stroke="#0066cc"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Energy Level - Dark Tile */}
      <div className="bg-surface-tile-1 text-on-dark p-[48px] md:p-[80px] flex flex-col justify-between min-h-[320px]">
        <div className="space-y-[12px]">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-3xl text-body-muted">
              bolt
            </span>
            <span className="bg-surface-tile-2 text-body-muted px-[14px] py-[8px] rounded-[11px] text-[14px]">
              {t("app.dashboard.active")}
            </span>
          </div>

          <div className="mt-[24px] space-y-[8px]">
            <h3 className="text-[28px] font-semibold leading-[1.14] text-body-on-dark">
              {t("app.dashboard.energyLevel")}
            </h3>
            <p className="text-[17px] text-body-muted leading-[1.47]">
              {t("app.dashboard.peakWindow")}
            </p>
          </div>
        </div>

        <div className="h-[64px] flex items-end gap-[6px] mt-[32px]">
          {[40, 65, 100, 75, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-body-muted/30 rounded-[5px] transition-all"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
