import { useTranslation } from "react-i18next";
import { NotificationSettings } from "./NotificationsSettings";

export const NotificationsPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-canvas border border-hairline rounded-[18px] p-[32px]">
      <div className="space-y-[8px] mb-[24px]">
        <h3 className="text-[21px] font-semibold text-ink leading-[1.19]">
          {t("app.settings.notificationPreferences")}
        </h3>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {t("app.settings.notificationDescription")}
        </p>
      </div>
      <NotificationSettings />
    </div>
  );
};
