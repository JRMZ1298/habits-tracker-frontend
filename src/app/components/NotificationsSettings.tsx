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
    if (!prefs) return;
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

  if (!prefs) {
    return (
      <div className="space-y-[17px]">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-[17px] animate-pulse"
          >
            <div className="flex items-start gap-[12px]">
              <div className="w-[20px] h-[20px] bg-canvas-parchment rounded" />
              <div className="space-y-[8px]">
                <div className="h-[14px] w-32 bg-canvas-parchment rounded" />
                <div className="h-[12px] w-48 bg-canvas-parchment rounded" />
              </div>
            </div>
            <div className="w-[51px] h-[31px] bg-canvas-parchment rounded-[9999px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-[17px]">
      {settings.map(({ key, label, desc, icon }) => (
        <div
          key={key}
          className="flex items-center justify-between gap-[17px] py-[12px]"
        >
          <div className="flex items-start gap-[12px]">
            <span className="material-symbols-outlined text-[20px] text-ink-muted-48 mt-[2px]">
              {icon}
            </span>
            <div className="space-y-[4px]">
              <p className="text-[17px] text-ink font-normal leading-[1.24]">
                {label}
              </p>
              <p className="text-[14px] text-ink-muted-48 leading-[1.43]">
                {desc}
              </p>
            </div>
          </div>

          {/* Apple-style Toggle */}
          <button
            onClick={() => toggle(key)}
            disabled={updatePrefs.isPending}
            className={`relative w-[51px] h-[31px] rounded-[9999px] transition-colors duration-200 shrink-0
              ${
                prefs?.[key]
                  ? "bg-primary"
                  : "bg-canvas-parchment border border-hairline"
              }`}
          >
            <span
              className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white
              shadow-sm transition-all duration-200
              ${prefs?.[key] ? "left-[22px]" : "left-[2px]"}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};
