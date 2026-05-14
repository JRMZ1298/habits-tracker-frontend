import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useThemeStore } from "@/stores/themeStore";

export const TopAppBar = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      {/* Global Nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-surface-black h-[44px] flex items-center justify-center">
        <nav className="max-w-[980px] w-full px-6 flex items-center">
          <div className="flex-1 flex justify-start">
            <Link
              to="/home"
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
            >
              {t("appName")}
            </Link>
          </div>
          <div className="flex-1 hidden md:flex items-center justify-center gap-[20px]">
            <a
              href="#features"
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
            >
              {t("landing.nav.features")}
            </a>
            <a
              href="#testimonials"
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
            >
              {t("landing.nav.testimonials")}
            </a>
          </div>
          <div className="flex-1 flex items-center justify-end gap-[16px]">
            <Link
              to="/auth/login"
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
            >
              {t("landing.nav.login")}
            </Link>
            <Link
              to="/auth/registro"
              className="bg-surface-tile-1 text-on-dark text-[14px] font-normal leading-[1.29] tracking-[-0.224px] rounded-[8px] px-[15px] py-[8px] transition-transform active:scale-[0.95]"
            >
              {t("landing.nav.signup")}
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
              }
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer to push content below fixed navs */}
      <div className="h-[96px]" />
    </>
  );
};
