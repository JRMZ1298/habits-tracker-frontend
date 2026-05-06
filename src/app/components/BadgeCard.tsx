import type { Badge } from "@/interfaces/api";

interface BadgeCardProps {
  badge: Badge;
  currentStreak: number;
}

export const BadgeCard = ({ badge, currentStreak }: BadgeCardProps) => {
  const progressPercent =
    badge.required_streak > 0
      ? Math.min(Math.round((currentStreak / badge.required_streak) * 100), 100)
      : 0;

  return (
    <div
      className={`bg-canvas border border-hairline rounded-[18px] p-[24px] flex flex-col items-center gap-[12px] text-center transition-all
      ${!badge.unlocked ? "opacity-50" : ""}`}
    >
      {/* Icon */}
      <div
        className={`w-[56px] h-[56px] rounded-full flex items-center justify-center
        ${
          badge.unlocked
            ? "bg-canvas-parchment"
            : "border border-dashed border-hairline bg-transparent"
        }`}
      >
        <span
          className="material-symbols-outlined text-[28px] text-ink"
          style={{ fontVariationSettings: `'FILL' ${badge.unlocked ? 1 : 0}` }}
        >
          {badge.unlocked ? badge.icon : "lock"}
        </span>
      </div>

      {/* Name and description */}
      <div className="space-y-[4px]">
        <p className="text-[14px] text-ink font-normal leading-[1.43] tracking-[-0.224px]">
          {badge.name}
        </p>
        <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
          {badge.description}
        </p>
      </div>

      {/* Unlocked: date */}
      {badge.unlocked && badge.unlocked_at && (
        <p className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
          {new Date(badge.unlocked_at).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}

      {/* Locked: progress bar */}
      {!badge.unlocked && (
        <div className="w-full space-y-[8px]">
          <div className="flex justify-between text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            <span>{currentStreak} días</span>
            <span>{badge.required_streak} días</span>
          </div>
          <div className="w-full h-[5px] bg-canvas-parchment rounded-[5px] overflow-hidden">
            <div
              className="h-full bg-ink rounded-[5px] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
