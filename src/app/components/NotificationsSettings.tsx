// src/components/NotificationSettings.tsx
import type { NotificationPreferences } from "@/interfaces/api";
import {
  useNotificationPreferences,
  useUpdateNotifications,
} from "../hooks/useNotifications";
import { useTranslation } from "react-i18next";

export const NotificationSettings = () => {
  const { t } = useTranslation();
  const { data: prefs } = useNotificationPreferences();
  const updatePrefs = useUpdateNotifications();

  const toggle = (key: keyof NotificationPreferences) => {
    if (!prefs) {
      return <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />;
    }
    updatePrefs.mutate({ ...prefs, [key]: !prefs[key] });
  };

  const settings: {
    key: keyof NotificationPreferences;
    label: string;
    desc: string;
    icon: string;
  }[] = [
    {
      key: "daily_reminder",
      label: t("app.settings.dailyReminder"),
      desc: t("app.settings.dailyReminderDesc"),
      icon: "notifications_active",
    },
    {
      key: "weekly_summary",
      label: t("app.settings.weeklySummary"),
      desc: t("app.settings.weeklySummaryDesc"),
      icon: "calendar_month",
    },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 space-y-4">
      {settings.map(({ key, label, desc, icon }) => (
        <div key={key} className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant mt-0.5">
              {icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-on-background">
                {label}
              </p>
              <p className="text-sm text-outline">{desc}</p>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => toggle(key)}
            disabled={updatePrefs.isPending}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0
              ${
                prefs?.[key] ? "bg-on-background" : "bg-surface-container-high"
              }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white
              shadow-sm transition-all duration-200
              ${prefs?.[key] ? "left-6" : "left-1"}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};
