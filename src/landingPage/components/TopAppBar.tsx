import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const TopAppBar = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Global Nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-surface-black h-[44px] flex items-center justify-center">
        <nav className="max-w-[980px] w-full px-6 flex items-center justify-between">
          <Link
            to="/home"
            className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
          >
            {t("appName")}
          </Link>
          <div className="hidden md:flex items-center gap-[20px]">
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
          <div className="flex items-center gap-[16px]">
            <Link
              to="/auth/login"
              className="text-[12px] font-normal text-on-dark leading-[1.0] tracking-[-0.12px] hover:text-body-muted transition-colors"
            >
              {t("landing.nav.login")}
            </Link>
            <Link
              to="/auth/registro"
              className="bg-ink text-on-dark text-[14px] font-normal leading-[1.29] tracking-[-0.224px] rounded-[8px] px-[15px] py-[8px] transition-transform active:scale-[0.95]"
            >
              {t("landing.nav.signup")}
            </Link>
          </div>
        </nav>
      </header>

      {/* Sub-nav Frosted */}
      <div className="fixed inset-x-0 top-[44px] z-40 bg-canvas-parchment/80 backdrop-blur-[20px] border-b border-hairline h-[52px] flex items-center">
        <div className="max-w-[980px] w-full px-6 flex items-center justify-between">
          <h2
            className="text-[21px] font-semibold text-ink leading-[1.19] tracking-[0.231px]"
          >
            {t("appName")}
          </h2>
          <div className="hidden md:flex items-center gap-[24px]">
            <a
              href="#features"
              className="text-[14px] font-normal text-ink leading-[1.29] tracking-[-0.224px] hover:text-primary transition-colors"
            >
              {t("landing.nav.features")}
            </a>
            <Link
              to="/auth/registro"
              className="bg-primary text-on-primary text-[17px] font-normal leading-[1.47] tracking-[-0.374px] rounded-[9999px] px-[22px] py-[11px] transition-transform active:scale-[0.95]"
            >
              {t("landing.nav.getStarted")}
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to push content below fixed navs */}
      <div className="h-[96px]" />
    </>
  );
};
