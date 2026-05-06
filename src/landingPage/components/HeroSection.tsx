import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-canvas py-[80px] md:py-[80px]" id="features">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        {/* Hero headline */}
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1] md:leading-[1.07] tracking-[-0.28px] mb-[12px]"
        >
          {t("landing.hero.headingLine1")}{" "}
          <span className="text-primary">{t("landing.hero.headingLine2")}</span>
        </h1>

        {/* Lead subcopy */}
        <p
          className="text-[21px] md:text-[28px] font-normal text-ink leading-[1.47] md:leading-[1.14] tracking-[0.231px] md:tracking-[0.196px] max-w-[680px] mx-auto mb-[24px]"
        >
          {t("landing.hero.paragraph")}
        </p>

        {/* Dual pill CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[17px] mb-[48px]">
          <Link
            to="/auth/registro"
            className="bg-primary text-on-primary text-[17px] font-normal leading-[1.47] tracking-[-0.374px] rounded-[9999px] px-[22px] py-[11px] transition-transform active:scale-[0.95] min-w-[140px]"
          >
            {t("landing.hero.startGrowing")}
          </Link>
          <Link
            to="/auth/login"
            className="bg-transparent text-primary border border-primary text-[17px] font-normal leading-[1.47] tracking-[-0.374px] rounded-[9999px] px-[22px] py-[11px] transition-transform active:scale-[0.95] min-w-[140px]"
          >
            {t("landing.hero.watchDemo")}
          </Link>
        </div>

        {/* Product imagery */}
        <div className="relative max-w-[720px] mx-auto">
          <img
            className="w-full h-auto rounded-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF1Te_s03rXQc-fpHsb0TxwnhlQfnmcASGcPtCJSMBursPOZRL0ykOh4bjRck65H8pgJip1yyBx84IUzw-UcC_86zR6Tq_wlC9RqNR1yzAyhimqPlax6SoQz0Q55r4oriXEDDavZ8jOGhXk3bN1A7lCIL3DLv_WwuT3egLeYTDONSWsblFNmOPjbCA0efZrALmuoJ5IDVSUKRb4wxKxO5if1PKXy8zqOmlAQXTK0bVSt-qFNCorg_2XWS2IWJjQe0nzvVXqiymfHo"
            alt={t("landing.hero.altImage")}
            style={{
              filter:
                "drop-shadow(rgba(0, 0, 0, 0.22) 3px 5px 30px 0)",
            }}
          />
        </div>
      </div>
    </section>
  );
};
