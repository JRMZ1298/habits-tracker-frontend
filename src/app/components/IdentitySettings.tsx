import { useState } from "react";
import { useTranslation } from "react-i18next";

export const IdentitySettings = () => {
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState("Elena Rivers");
  const [email, setEmail] = useState("elena.rivers@design.com");

  const handleSave = () => {
    console.log("Saving changes:", { displayName, email });
  };

  const handleDiscard = () => {
    setDisplayName("Elena Rivers");
    setEmail("elena.rivers@design.com");
  };

  return (
    <div className="lg:col-span-12 bg-white rounded-lg p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary-container overflow-hidden border-4 border-surface ring-2 ring-primary-container">
          <img
            alt="User profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo50_diWeKtoj8lBGyxuyvepoSsltvGqcjnWvcYagTu93y-4RWnuV5KKuHTqkEGpV5N-IXRRvaXTPLZMq1CWm2CrPn6_vhGC_nJZNuKtuTdREJq1mx3KPT2tThbWGHhC7l16rqBPA9hL6WUnSHKjfLC73yu9Q3jPirHz7mOOWKc3PCBviNsVoSJUvUIR7TF48TTEB54kATQqbZAwRglqCfX6zvchNdsqwJYkQAJkMfMD0UoRQJh8bhRm9JrTdiFP2foapd1pHIlxs"
          />
        </div>
        <button className="absolute bottom-0 right-0 w-8 h-8 bg-on-background rounded-full flex items-center justify-center border-2 border-white text-white">
          <span className="material-symbols-outlined text-sm">edit</span>
        </button>
      </div>
      <div className="flex-1 space-y-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant font-bold">
              {t("app.settings.displayName")}
            </label>
            <input
              className="w-full bg-surface-container-low border-none rounded-full p-3 text-sm focus:bg-surface-container-high transition-colors"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant font-bold">
              {t("app.settings.emailAddress")}
            </label>
            <input
              className="w-full bg-surface-container-low border-none rounded-full p-3 text-sm focus:bg-surface-container-high transition-colors"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleDiscard}
            className="px-6 py-2 rounded-full border border-outline text-on-background text-sm font-bold hover:text-red-600 hover:bg-red-100 hover:border-red-600 transition-colors"
          >
            {t("app.settings.advanced.discard")}
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2 rounded-full bg-on-background text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {t("app.settings.advanced.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};
