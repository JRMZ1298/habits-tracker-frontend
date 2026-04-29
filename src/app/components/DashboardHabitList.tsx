import { useTranslation } from "react-i18next";
import { useLogHabit } from "../hooks/useHabits";
import type { Habit } from "@/interfaces/api";
import { getHabitColor } from "@/lib/habitColors";
import { todayFormat } from "@/lib/todayFormat";
import { useState } from "react";
import { BadgeUnlockToast } from "./BadgeUnlockToast";

interface Props {
  habits: Habit[];
  isLoading: boolean;
  completedMap: Record<number, boolean>;
  // Paginación
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const DashboardHabitList: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [newBadge, setNewBadge] = useState<{
    name: string;
    icon: string;
    description: string;
  } | null>(null);

  const logHabit = useLogHabit((badge) => setNewBadge(badge));

  const handleComplete = (habit: Habit, completedToday: boolean) => {
    if (completedToday) return; // Ya completado — no hacer nada
    if (logHabit.isPending) return; // Petición en curso — evitar duplicados
    logHabit.mutate(habit.id);
  };

  if (props.isLoading) {
    return (
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-black text-on-background font-headline">
          {t("app.dashboard.checkIns")}
        </h2>
        {/* Skeleton mientras carga */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest p-6 rounded-lg animate-pulse h-20"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-on-background font-headline">
            {t("app.dashboard.checkIns")}
          </h2>
          <span className="text-label text-xs font-bold text-outline uppercase tracking-widest">
            {todayFormat()}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {props.habits?.length === 0 && (
            <p className="text-outline text-center py-8">
              {t("app.dashboard.noHabits")}
            </p>
          )}

          {props.habits?.map((habit, index) => {
            const { bgColor, textColor } = getHabitColor(index);
            const completedToday = props.completedMap[habit.id] ?? false;

            return (
              <div
                key={habit.id}
                onClick={() => handleComplete(habit, completedToday)}
                className={`bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between group transition-all
                ${
                  completedToday
                    ? "opacity-60 cursor-default"
                    : "cursor-pointer hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 rounded-full ${bgColor} flex items-center justify-center ${textColor}`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {habit.icon ?? "task_alt"}
                    </span>
                  </div>

                  <div className="text-on-background">
                    <h4 className="text-lg font-bold">{habit.name}</h4>
                    <p className="text-sm text-outline">
                      {habit.goal ?? habit.frequency}
                    </p>
                  </div>
                </div>

                {/* Círculo de completado */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                ${
                  completedToday
                    ? "bg-surface-tint text-on-primary"
                    : "border-2 border-outline-variant group-hover:border-surface-tint"
                }
                ${
                  logHabit.isPending && logHabit.variables === habit.id
                    ? "animate-pulse"
                    : ""
                }`}
                >
                  {completedToday && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Controles de paginación — solo si hay más de una página */}
        {props.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={props.onPrev}
              disabled={!props.hasPrev}
              className="flex items-center gap-2 text-sm font-semibold text-outline hover:text-on-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              {t("app.dashboard.prev")}
            </button>

            {/* Indicador de página */}
            <div className="flex items-center gap-2">
              {Array.from({ length: props.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <div
                    key={p}
                    className={`w-2 h-2 rounded-full transition-all
                  ${
                    p === props.page
                      ? "bg-on-background w-4" // Punto activo más ancho
                      : "bg-outline-variant"
                  }`}
                  />
                ),
              )}
            </div>

            <button
              onClick={props.onNext}
              disabled={!props.hasNext}
              className="flex items-center gap-2 text-sm font-semibold text-outline hover:text-on-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t("app.dashboard.next")}
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </button>
          </div>
        )}
      </div>
      <BadgeUnlockToast badge={newBadge} onClose={() => setNewBadge(null)} />
    </>
  );
};
