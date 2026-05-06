import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const CtaSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface-tile-3 py-[80px]">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        <h2
          className="text-[40px] md:text-[56px] font-semibold text-on-dark leading-[1.1] tracking-[-0.28px] mb-[12px]"
        >
          {t("landing.cta.title")}
        </h2>
        <p
          className="text-[21px] font-normal text-body-muted leading-[1.47] max-w-[680px] mx-auto mb-[24px]"
        >
          {t("landing.cta.subtitle")}
        </p>
        <Link
          to="/auth/registro"
          className="inline-block bg-primary text-on-primary text-[17px] font-normal leading-[1.47] tracking-[-0.374px] rounded-[9999px] px-[22px] py-[11px] transition-transform active:scale-[0.95]"
        >
          {t("landing.cta.button")}
        </Link>
      </div>
    </section>
  );
};
