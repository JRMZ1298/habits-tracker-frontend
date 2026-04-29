import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBadges, useBadgesProgress } from "../hooks/useBadges";
import type { Badge } from "@/interfaces/api";
import { BadgeCard } from "../components/BadgeCard";

type Filter = "all" | "unlocked" | "locked";

// Agrupa las insignias por categoría
function groupByCategory(badges: Badge[]): Record<string, Badge[]> {
  return badges.reduce(
    (acc, badge) => {
      const cat = badge.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(badge);
      return acc;
    },
    {} as Record<string, Badge[]>,
  );
}

// Nombre legible de cada categoría
const CATEGORY_NAMES: Record<string, string> = {
  water_drop: "Hidratación",
  directions_run: "Ejercicio",
  self_improvement: "Meditación",
  menu_book: "Lectura",
  fitness_center: "Fitness",
};

export const BadgesGalleryPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const { data: badges, isLoading } = useBadges();
  const { data: progress } = useBadgesProgress();

  const filtered = useMemo(() => {
    if (!badges) return [];
    if (filter === "unlocked") return badges.filter((b) => b.unlocked);
    if (filter === "locked") return badges.filter((b) => !b.unlocked);
    return badges;
  }, [badges, filter]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);
  const unlockedCount = badges?.filter((b) => b.unlocked).length ?? 0;
  const totalCount = badges?.length ?? 0;
  const percentage =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  if (isLoading) {
    return (
      <div>
        <div style={{ marginBottom: "2rem" }}>
          <h1 className="text-4xl font-black text-on-surface font-headline">
            {t("app.badges.title")}
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-surface-container-lowest rounded-lg p-6 animate-pulse h-36"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-on-surface font-headline">
          {t("app.badges.title")}
        </h1>
        <p className="text-on-surface-variant mt-1 font-label">
          {t("app.badges.subtitle")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: t("app.badges.unlocked"), value: unlockedCount },
          { label: t("app.badges.total"), value: totalCount },
          { label: t("app.badges.progress"), value: `${percentage}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-container-low rounded-lg p-5">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-label mb-1">
              {label}
            </p>
            <p className="text-3xl font-black text-on-background font-headline">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-8">
        {(["all", "unlocked", "locked"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border
              ${
                filter === f
                  ? "bg-on-background text-background border-on-background"
                  : "bg-transparent text-on-surface-variant border-outline-variant hover:bg-surface-container-low"
              }`}
          >
            {t(`app.badges.filter.${f}`)}
          </button>
        ))}
      </div>

      {/* Grid por categoría */}
      {Object.entries(grouped).map(([category, categoryBadges]) => (
        <div key={category} className="mb-10">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">
              {category}
            </span>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-label">
              {CATEGORY_NAMES[category] ?? category}
            </p>
            <span className="text-xs text-outline ml-auto">
              {categoryBadges.filter((b) => b.unlocked).length} /{" "}
              {categoryBadges.length}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryBadges.map((badge) => (
              <BadgeCard
                key={badge.key}
                badge={badge}
                currentStreak={progress?.[badge.category] ?? 0}
              />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="material-symbols-outlined text-5xl text-outline-variant">
            workspace_premium
          </span>
          <p className="text-outline text-center">{t("app.badges.empty")}</p>
        </div>
      )}
    </div>
  );
};
