import { useTranslation } from "react-i18next";
import { NotificationSettings } from "./NotificationsSettings";

export const NotificationsPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-8 bg-surface-container-low rounded-lg p-8 space-y-8">
      <div className="flex items-center gap-4">
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
        <NotificationSettings />
      </div>
    </div>
  );
};
