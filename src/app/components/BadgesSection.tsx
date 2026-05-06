import { useNavigate } from "react-router";
import { useBadges } from "../hooks/useBadges";
import { useTranslation } from "react-i18next";

export const BadgesSection = () => {
  const { t } = useTranslation();
  const { data: badges, isLoading } = useBadges();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[24px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-[12px] animate-pulse"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-canvas-parchment" />
            <div className="h-[12px] w-16 bg-canvas-parchment rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[24px]">
        <div className="space-y-[4px]">
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            {t("app.metrics.collections")}
          </span>
          <h2
            className="text-[28px] font-semibold text-ink leading-[1.14]"
            style={{ letterSpacing: "0.196px" }}
          >
            {t("app.metrics.unlockedBadges")}
          </h2>
        </div>
        <span className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
          {badges?.filter((b) => b.unlocked).length} / {badges?.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[24px]">
        {badges?.slice(0, 3)?.map((badge) => (
          <div
            key={badge.key}
            className={`flex flex-col items-center gap-[12px] transition-all
              ${!badge.unlocked ? "opacity-40" : ""}`}
            title={
              badge.unlocked
                ? `${badge.name} — ${badge.description}`
                : `Bloqueada: ${badge.description}`
            }
          >
            <div
              className={`w-[80px] h-[80px] rounded-full flex items-center justify-center
              group transition-transform
              ${
                badge.unlocked
                  ? "bg-canvas border border-hairline"
                  : "bg-canvas-parchment border border-dashed border-hairline"
              }`}
            >
              <span
                className="material-symbols-outlined text-[32px] text-ink"
                style={{
                  fontVariationSettings: `'FILL' ${badge.unlocked ? 1 : 0}`,
                }}
              >
                {badge.unlocked ? badge.icon : "lock"}
              </span>
            </div>
            <span className="text-[14px] text-ink font-normal leading-[1.43] text-center tracking-[-0.224px]">
              {badge.name}
            </span>
            {badge.unlocked && badge.unlocked_at && (
              <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
                {new Date(badge.unlocked_at).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}

        {/* See More */}
        <div
          className="flex flex-col items-center gap-[12px] cursor-pointer group"
          onClick={() => navigate("/app/badges")}
        >
          <div
            className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-canvas-parchment border border-dashed border-hairline group-hover:border-primary/50 transition-colors"
          >
            <span
              className="material-symbols-outlined text-[32px] text-ink-muted-48 group-hover:text-primary transition-colors"
              style={{ fontVariationSettings: `'FILL' 1` }}
            >
              arrow_forward
            </span>
          </div>
          <span className="text-[14px] text-primary font-normal leading-[1.43] text-center tracking-[-0.224px]">
            {t("app.metrics.viewAll")}
          </span>
        </div>
      </div>
    </div>
  );
};
