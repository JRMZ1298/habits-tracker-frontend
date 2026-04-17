import { useTranslation } from "react-i18next";
import { NotificationsPanel } from "../components/NotificationsPanel";
import { WebhooksPanel } from "../components/WebhooksPanel";
import { AdvancedConfiguration } from "../components/AdvancedConfiguration";
import { IdentitySettings } from "../components/IdentitySettings";

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex-1 space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold text-surface-tint font-headline tracking-tight mb-2">
          {t("app.settings.title")}
        </h1>
        <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">
          {t("app.settings.subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <NotificationsPanel />
        <WebhooksPanel />
        <AdvancedConfiguration />
        <IdentitySettings />
      </div>
    </section>
  );
};
