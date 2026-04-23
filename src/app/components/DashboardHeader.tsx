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
    <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-5">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-surface-tint">
          {t("app.dashboard.heading") + user?.name.split(" ", 1)}
        </h1>
        <p className="text-lg text-outline font-medium">
          {t("app.dashboard.subtitle") + percentageCompleted + "%"}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-surface-container-low px-6 py-4 rounded-lg flex flex-col">
          <span className="text-label text-[10px] uppercase tracking-widest text-outline">
            {t("app.dashboard.currentStreak")}
          </span>
          <span className="text-3xl font-black text-surface-tint">
            {currentStreak + t("app.dashboard.days")}
          </span>
        </div>
        <div className="bg-secondary-container px-6 py-4 rounded-lg flex flex-col">
          <span className="text-label text-[10px] uppercase tracking-widest text-on-secondary-container">
            {t("app.dashboard.level")}
          </span>
          <span className="text-3xl font-black text-on-secondary-container">
            {level}
          </span>
        </div>
      </div>
    </header>
  );
};
