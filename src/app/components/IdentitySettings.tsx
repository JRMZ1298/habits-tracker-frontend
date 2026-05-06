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
    <div className="bg-canvas border border-hairline rounded-[18px] p-[32px] md:p-[48px] flex flex-col md:flex-row gap-[32px] items-center md:items-start">
      <div className="relative">
        <div className="w-[96px] h-[96px] rounded-full bg-canvas-parchment overflow-hidden">
          <img
            alt="User profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo50_diWeKtoj8lBGyxuyvepoSsltvGqcjnWvcYagTu93y-4RWnuV5KKuHTqkEGpV5N-IXRRvaXMLPLZMq1mx3KPT2tThC7l16rqBPA9hL6WUnSHKjfLC73yu9Q3jPirHz7mOOWKc3PCBviNsVoSJUvUIR7TF48TTEB54kATQqbZAwRglqCfX6zvchNdsqwJYkQAJkMfMD0UoRQJh8bhRm9JrTdiFP2foapd1pHIlxs"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-surface-chip-translucent rounded-full flex items-center justify-center transition-transform active:scale-[0.95]">
          <span className="material-symbols-outlined text-[16px] text-ink">edit</span>
        </button>
      </div>
      <div className="flex-1 space-y-[24px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[17px]">
          <div className="space-y-[8px]">
            <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
              {t("app.settings.displayName")}
            </label>
            <input
              className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-hairline focus:border-primary outline-none transition-colors"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-[8px]">
            <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
              {t("app.settings.emailAddress")}
            </label>
            <input
              className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-hairline focus:border-primary outline-none transition-colors"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-[8px] pt-[8px]">
          <button
            onClick={handleDiscard}
            className="px-[22px] py-[11px] rounded-[9999px] text-[17px] text-primary font-normal leading-[1.47] border border-primary/30 transition-transform active:scale-[0.95]"
          >
            {t("app.settings.advanced.discard")}
          </button>
          <button
            onClick={handleSave}
            className="px-[22px] py-[11px] rounded-[9999px] bg-primary text-on-primary text-[17px] font-normal leading-[1.47] transition-transform active:scale-[0.95]"
          >
            {t("app.settings.advanced.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};
