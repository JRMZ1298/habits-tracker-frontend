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
      className={`bg-surface-container-lowest rounded-lg p-5 flex flex-col items-center gap-3 text-center transition-all
      ${!badge.unlocked ? "opacity-50" : "hover:-translate-y-0.5"}`}
    >
      {/* Ícono */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center
        ${
          badge.unlocked
            ? "bg-surface-container"
            : "border-2 border-dashed border-outline-variant bg-transparent"
        }`}
      >
        <span
          className="material-symbols-outlined text-3xl text-on-surface-variant"
          style={{ fontVariationSettings: `'FILL' ${badge.unlocked ? 1 : 0}` }}
        >
          {badge.unlocked ? badge.icon : "lock"}
        </span>
      </div>

      {/* Nombre y requisito */}
      <div>
        <p className="font-bold text-sm text-on-background">{badge.name}</p>
        <p className="text-xs text-outline mt-0.5">{badge.description}</p>
      </div>

      {/* Desbloqueada: fecha */}
      {badge.unlocked && badge.unlocked_at && (
        <p className="text-xs text-outline">
          {new Date(badge.unlocked_at).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}

      {/* Bloqueada: barra de progreso */}
      {!badge.unlocked && (
        <div className="w-full">
          <div className="flex justify-between text-xs text-outline mb-1">
            <span>{currentStreak} días</span>
            <span>{badge.required_streak} días</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-on-surface-variant rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
