import { useAuthStore } from "@/auth/store/authStore";
import { useTranslation } from "react-i18next";

interface Props {
  percentageCompleted: number;
  currentStreak: number;
  level: number;
}

export const DashboardHeader: React.FC<Props> = ({
  percentageCompleted,
  currentStreak,
  level,
}) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-[32px] pb-[48px]">
      <div className="space-y-3">
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1] tracking-[-0.01em]"
          style={{ letterSpacing: "-0.28px" }}
        >
          {t("app.dashboard.heading")}
          <br />
          <span className="text-primary">{user?.name.split(" ", 1)}</span>
        </h1>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {t("app.dashboard.subtitle")}{" "}
          <span className="text-ink font-semibold">{percentageCompleted}%</span>
        </p>
      </div>

      <div className="flex gap-3">
        <div className="bg-canvas px-[17px] py-[12px] rounded-[11px] flex flex-col items-center min-w-[100px]">
          <span className="text-[12px] text-ink-muted-48 uppercase tracking-wide font-normal">
            {t("app.dashboard.currentStreak")}
          </span>
          <span className="text-[40px] font-semibold text-ink mt-[4px] leading-[1.1]">
            {currentStreak}
          </span>
          <span className="text-[12px] text-ink-muted-48">
            {t("app.dashboard.days")}
          </span>
        </div>

        <div className="bg-surface-tile-1 px-[17px] py-[12px] rounded-[11px] flex flex-col items-center min-w-[100px]">
          <span className="text-[12px] text-body-muted uppercase tracking-wide font-normal">
            {t("app.dashboard.level")}
          </span>
          <span className="text-[40px] font-semibold text-primary-on-dark mt-[4px] leading-[1.1]">
            {level}
          </span>
        </div>
      </div>
    </header>
  );
};
