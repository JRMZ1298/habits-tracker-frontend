import { useTranslation } from "react-i18next";

export const AdvancedConfiguration = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container rounded-lg p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white">
              sync_alt
            </span>
          </div>
          <div>
            <h4 className="font-bold">{t("app.settings.advanced.sync")}</h4>
            <p className="text-xs text-on-surface-variant">
              {t("app.settings.advanced.syncDescription")}
            </p>
          </div>
        </div>
        <select className="bg-white border-none rounded-full px-4 py-2 text-sm font-bold text-on-background focus:ring-0">
          <option>{t("app.settings.advanced.realTime")}</option>
          <option>{t("app.settings.advanced.every15")}</option>
          <option>{t("app.settings.advanced.hourly")}</option>
        </select>
      </div>
      <div className="bg-surface-container rounded-lg p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-dim flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary">
              security
            </span>
          </div>
          <div>
            <h4 className="font-bold">
              {t("app.settings.advanced.privacyMode")}
            </h4>
            <p className="text-xs text-on-surface-variant">
              {t("app.settings.advanced.privacyDescription")}
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input className="sr-only peer" type="checkbox" />
          <div className="w-12 h-6 bg-surface-dim rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-on-background" />
        </label>
      </div>
    </div>
  );
};
