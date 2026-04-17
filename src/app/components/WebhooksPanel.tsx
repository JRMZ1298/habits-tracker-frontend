import { useTranslation } from "react-i18next";

export const WebhooksPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-4 bg-secondary-container rounded-lg p-8 flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-on-secondary-container text-2xl">
            api
          </span>
        </div>
        <h3 className="text-xl font-bold text-on-secondary-container font-headline mb-2">
          {t("app.settings.developerWebhooks")}
        </h3>
        <p className="text-on-secondary-container/80 text-sm mb-6">
          {t("app.settings.webhooksDescription")}
        </p>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-label tracking-widest text-on-secondary-container/60 font-bold">
              {t("app.settings.webhookUrl")}
            </label>
            <input
              className="w-full bg-white/50 border-none rounded-lg p-3 text-sm placeholder-on-secondary-container/40"
              placeholder="https://api.tudominio.com/vitality"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-label tracking-widest text-on-secondary-container/60 font-bold">
              {t("app.settings.secretKey")}
            </label>
            <input
              className="w-full bg-white/50 border-none rounded-lg p-3 text-sm"
              type="password"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>
      </div>
      <button className="mt-8 py-3 bg-secondary-dim text-white rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
        {t("app.settings.saveWebhook")}
      </button>
    </div>
  );
};
