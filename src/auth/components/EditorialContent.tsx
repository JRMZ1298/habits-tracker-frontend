import { useTranslation } from "react-i18next";

export const EditorialContent = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex flex-col space-y-8 pr-12">
      <div className="space-y-4">
        <span className="font-label text-surface-tint font-bold tracking-widest text-sm uppercase">
          {t("landing.editorial.joinFramework")}
        </span>
        <h1 className="text-6xl font-headline font-extrabold text-surface-tint tracking-tight leading-[1.1]">
          {t("landing.editorial.headlinePart1")}{" "}
          <span className="text-on-background italic">
            {t("landing.editorial.headlineHighlight")}
          </span>{" "}
          {t("landing.editorial.headlinePart2")}
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-md">
          {t("landing.editorial.paragraph")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-surface-container-low p-6 rounded-lg flex items-start gap-4">
          <div className="bg-primary-container text-on-primary-container p-3 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">eco</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg">
              {t("landing.editorial.card1.title")}
            </h3>
            <p className="font-label text-sm text-on-surface-variant opacity-80">
              {t("landing.editorial.card1.description")}
            </p>
          </div>
        </div>
        <div className="bg-surface-container-low/60 p-6 rounded-lg flex items-start gap-4">
          <div className="bg-secondary-container text-on-secondary-container p-3 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg">
              {t("landing.editorial.card2.title")}
            </h3>
            <p className="font-label text-sm text-on-surface-variant opacity-80">
              {t("landing.editorial.card2.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
