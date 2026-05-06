import { useTranslation } from "react-i18next";

export const WebhooksPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-surface-tile-1 text-on-dark rounded-[18px] p-[32px] flex flex-col justify-between">
      <div className="space-y-[17px]">
        <div className="w-[44px] h-[44px] rounded-full bg-surface-tile-2 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-on-dark text-[24px]">
            api
          </span>
        </div>
        <div className="space-y-[8px]">
          <h3 className="text-[17px] font-semibold text-body-on-dark leading-[1.24]">
            {t("app.settings.developerWebhooks")}
          </h3>
          <p className="text-[14px] text-body-muted leading-[1.43]">
            {t("app.settings.webhooksDescription")}
          </p>
        </div>
        <div className="space-y-[17px]">
          <div className="space-y-[8px]">
            <label className="text-[12px] text-body-muted tracking-[-0.12px]">
              {t("app.settings.webhookUrl")}
            </label>
            <input
              className="w-full bg-surface-tile-2 text-body-on-dark text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] placeholder:text-body-muted/50 border border-surface-tile-2 focus:border-primary-on-dark/50 outline-none transition-colors"
              placeholder="https://api.tudominio.com/vitality"
              type="text"
            />
          </div>
          <div className="space-y-[8px]">
            <label className="text-[12px] text-body-muted tracking-[-0.12px]">
              {t("app.settings.secretKey")}
            </label>
            <input
              className="w-full bg-surface-tile-2 text-body-on-dark text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] placeholder:text-body-muted/50 border border-surface-tile-2 focus:border-primary-on-dark/50 outline-none transition-colors"
              type="password"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>
      </div>
      <button className="mt-[24px] w-full bg-primary-on-dark text-on-dark text-[17px] font-normal leading-[1.47] rounded-[9999px] px-[22px] py-[11px] transition-transform active:scale-[0.95]">
        {t("app.settings.saveWebhook")}
      </button>
    </div>
  );
};
