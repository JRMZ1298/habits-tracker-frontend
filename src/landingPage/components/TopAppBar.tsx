import { useTranslation } from "react-i18next";

export const TopAppBar = () => {
  const { t } = useTranslation();
  const navItems = [
    { key: "landing.nav.features", href: "#features" },
    { key: "landing.nav.testimonials", href: "#testimonials" },
    { key: "landing.nav.login", href: "#login" },
    { key: "landing.nav.signup", href: "#signup" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tight text-surface-tint">
          {t("appName")}
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className="text-surface-tint font-semibold tracking-tight hover:bg-surface-container-low transition-colors px-3 py-1 rounded-full active:scale-95"
          >
            {t(item.key)}
          </a>
        ))}
      </nav>
      <button className="bg-surface-tint text-on-primary px-8 py-3 rounded-full font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-surface-tint/10">
        {t("landing.nav.getStarted")}
      </button>
    </header>
  );
};
