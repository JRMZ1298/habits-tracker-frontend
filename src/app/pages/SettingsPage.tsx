import { useTranslation } from "react-i18next";
import { NotificationsPanel } from "../components/NotificationsPanel";
import { WebhooksPanel } from "../components/WebhooksPanel";
import { IdentitySettings } from "../components/IdentitySettings";

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex-1 space-y-12">
      <header className="space-y-3 pt-8">
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1]"
          style={{ letterSpacing: "-0.28px" }}
        >
          {t("app.settings.title")}
        </h1>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {t("app.settings.subtitle")}
        </p>
      </header>

      <div className="space-y-6">
        <IdentitySettings />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <NotificationsPanel />
          </div>
          <div className="lg:col-span-1">
            <WebhooksPanel />
          </div>
        </div>
      </div>
    </section>
  );
};
