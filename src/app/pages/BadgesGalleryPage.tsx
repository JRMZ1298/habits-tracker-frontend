import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBadges, useBadgesProgress } from "../hooks/useBadges";
import type { Badge } from "@/interfaces/api";
import { BadgeCard } from "../components/BadgeCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

const CATEGORY_NAMES: Record<string, string> = {
  water_drop: "Hidratación",
  directions_run: "Ejercicio",
  self_improvement: "Meditación",
  menu_book: "Lectura",
  fitness_center: "Fitness",
};

export const BadgesGalleryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const { data: badges, isLoading } = useBadges();
  const { data: progress } = useBadgesProgress();

  const filtered = useMemo(() => {
    if (!badges) return [];
    if (activeTab === "unlocked") return badges.filter((b) => b.unlocked);
    if (activeTab === "locked") return badges.filter((b) => !b.unlocked);
    return badges;
  }, [badges, activeTab]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);
  const unlockedCount = badges?.filter((b) => b.unlocked).length ?? 0;
  const totalCount = badges?.length ?? 0;
  const percentage =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  if (isLoading) {
    return (
      <div className="space-y-[48px]">
        <div>
          <h1
            className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1]"
            style={{ letterSpacing: "-0.28px" }}
          >
            {t("app.badges.title")}
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-canvas border border-hairline rounded-[18px] p-[24px] animate-pulse h-[180px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[48px]">
      {/* Header */}
      <div className="space-y-[12px] pt-[32px]">
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-ink leading-[1.1]"
          style={{ letterSpacing: "-0.28px" }}
        >
          {t("app.badges.title")}
        </h1>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {t("app.badges.subtitle")}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-[20px]">
        {[
          { label: t("app.badges.unlocked"), value: unlockedCount },
          { label: t("app.badges.total"), value: totalCount },
          { label: t("app.badges.progress"), value: `${percentage}%` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-canvas border border-hairline rounded-[18px] p-[24px]"
          >
            <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[8px]">
              {label}
            </p>
            <p
              className="text-[28px] font-semibold text-ink leading-[1.14]"
              style={{ letterSpacing: "0.196px" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters with Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList className="bg-canvas border border-hairline">
          <TabsTrigger value="all">{t("app.badges.filter.all")}</TabsTrigger>
          <TabsTrigger value="unlocked">{t("app.badges.filter.unlocked")}</TabsTrigger>
          <TabsTrigger value="locked">{t("app.badges.filter.locked")}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {/* Grid by category */}
          {Object.entries(grouped).map(([category, categoryBadges]) => (
            <div key={category} className="space-y-[24px] mt-[24px]">
              <div className="flex items-center gap-[12px] pb-[17px] border-b border-hairline">
                <span className="material-symbols-outlined text-ink-muted-48 text-[20px]">
                  {category}
                </span>
                <p className="text-[14px] text-ink-muted-48 tracking-[-0.224px]">
                  {CATEGORY_NAMES[category] ?? category}
                </p>
                <span className="text-[12px] text-ink-muted-48 ml-auto tracking-[-0.12px]">
                  {categoryBadges.filter((b) => b.unlocked).length} /{" "}
                  {categoryBadges.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
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
            <div className="flex flex-col items-center justify-center py-[80px] gap-[17px]">
              <span className="material-symbols-outlined text-[48px] text-ink-muted-48">
                workspace_premium
              </span>
              <p className="text-[17px] text-ink-muted-48 leading-[1.47] text-center">
                {t("app.badges.empty")}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
