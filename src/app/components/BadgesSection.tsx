import { useNavigate } from "react-router";
import { useBadges } from "../hooks/useBadges";
import { useTranslation } from "react-i18next";

export const BadgesSection = () => {
  const { t } = useTranslation();
  const { data: badges, isLoading } = useBadges();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="md:col-span-4 lg:col-span-4 bg-surface-container-high rounded-lg p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 animate-pulse"
            >
              <div className="w-20 h-20 rounded-full bg-surface-container-low" />
              <div className="h-3 w-16 bg-surface-container-low rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="md:col-span-4 lg:col-span-4 bg-surface-container-high rounded-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-label font-bold text-on-surface-variant">
            {t("app.metrics.collections")}
          </span>
          <h2 className="text-3xl font-bold font-headline">
            {t("app.metrics.unlockedBadges")}
          </h2>
        </div>
        <div className="text-xs font-bold text-outline">
          {badges?.filter((b) => b.unlocked).length} / {badges?.length}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {badges?.slice(0, 3)?.map((badge) => (
          <div
            key={badge.key}
            className={`flex flex-col items-center gap-3 transition-all
              ${!badge.unlocked ? "opacity-40 grayscale" : ""}`}
            title={
              badge.unlocked
                ? `${badge.name} — ${badge.description}`
                : `Bloqueada: ${badge.description}`
            }
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center
              group hover:scale-110 transition-all duration-300
              ${
                badge.unlocked
                  ? "bg-surface-container-lowest shadow-sm"
                  : "bg-surface-container-low border-2 border-dashed border-outline-variant"
              }`}
            >
              <span
                className="material-symbols-outlined text-4xl text-on-surface-variant"
                style={{
                  fontVariationSettings: `'FILL' ${badge.unlocked ? 1 : 0}`,
                }}
              >
                {badge.unlocked ? badge.icon : "lock"}
              </span>
            </div>
            <span className="text-xs font-bold font-label text-center">
              {badge.name}
            </span>
            {badge.unlocked && badge.unlocked_at && (
              <span className="text-[10px] text-outline text-center">
                {new Date(badge.unlocked_at).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}
        <div
          className={`flex flex-col items-center gap-3 transition-all opacity-40 grayscale`}
          onClick={() => navigate("/app/badges")}
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 bg-surface-container-low border-2 border-dashed border-outline-variant`}
          >
            <span
              className="material-symbols-outlined text-4xl text-on-surface-variant"
              style={{
                fontVariationSettings: `'FILL' 1`,
              }}
            >
              {"arrow_forward"}
            </span>
          </div>
          <span className="text-xs font-bold font-label text-center">
            {"Ver mas"}
          </span>
        </div>
      </div>
    </section>
  );
};
