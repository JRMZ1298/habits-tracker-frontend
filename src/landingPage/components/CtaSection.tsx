import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const CtaSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto text-center">
      <div className="relative overflow-hidden rounded-4xl p-16 bg-[#005c2d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(107,254,156,0.45),transparent_40%)] opacity-50" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {t("landing.cta.title")}
          </h2>
          <p className="text-[#6bfe9c] text-lg mb-12 max-w-xl mx-auto opacity-90">
            {t("landing.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth/login"
              className="bg-[#6bfe9c] text-[#004a23] px-12 py-5 rounded-full font-bold text-xl hover:bg-white transition-all active:scale-95 shadow-2xl shadow-black/20"
            >
              {t("landing.cta.button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
