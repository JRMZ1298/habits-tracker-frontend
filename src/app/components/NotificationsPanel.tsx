import { useTranslation } from "react-i18next";

interface ToggleProps {
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  defaultChecked?: boolean;
}

const Toggle = ({
  label,
  description,
  icon,
  iconColor,
  defaultChecked = false,
}: ToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg">
      <div className="flex items-center gap-4">
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
        <div>
          <p className="font-bold text-on-surface">{label}</p>
          <p className="text-xs text-on-surface-variant">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          defaultChecked={defaultChecked}
          className="sr-only peer"
          type="checkbox"
        />
        <div className="w-14 h-8 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-on-background" />
      </label>
    </div>
  );
};

export const NotificationsPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-8 bg-surface-container-low rounded-lg p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-background text-2xl">
            notifications_active
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-background font-headline">
            {t("app.settings.notificationPreferences")}
          </h3>
          <p className="text-on-surface-variant text-sm">
            {t("app.settings.notificationDescription")}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <Toggle
          label={t("app.settings.dailyReminders")}
          description={t("app.settings.dailyRemindersDescription")}
          icon="schedule"
          iconColor="text-secondary-dim"
          defaultChecked
        />
        <Toggle
          label={t("app.settings.weeklyDigest")}
          description={t("app.settings.weeklyDigestDescription")}
          icon="mail"
          iconColor="text-tertiary"
        />
        <Toggle
          label={t("app.settings.behavioralInsights")}
          description={t("app.settings.behavioralInsightsDescription")}
          icon="insights"
          iconColor="text-surface-tint"
          defaultChecked
        />
      </div>
    </div>
  );
};
