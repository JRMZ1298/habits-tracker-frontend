import { useTranslation } from "react-i18next";

export const MetricsBottomNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="md:hidden fixed bottom-0 w-full flex justify-around items-center px-4 py-3 pb-8 bg-white/80 backdrop-blur-2xl rounded-t-[2rem] z-50 shadow-[0_-8px_32px_rgba(0,54,34,0.1)]">
      {[
        { icon: "home", label: t("app.bottomNav.home") },
        { icon: "list_alt", label: t("app.bottomNav.list") },
        { icon: "bar_chart", label: t("app.bottomNav.stats"), active: true },
        { icon: "settings", label: t("app.bottomNav.settings") },
      ].map((item) => (
        <button
          key={item.label}
          className={`${item.active ? "bg-primary text-on-primary scale-110" : "text-secondary"} rounded-full p-3 transition-all duration-200 hover:opacity-80`}
          type="button"
        >
          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined"
              style={
                item.active ? { fontVariationSettings: "'FILL' 1" } : undefined
              }
            >
              {item.icon}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </div>
        </button>
      ))}
    </nav>
  );
};
