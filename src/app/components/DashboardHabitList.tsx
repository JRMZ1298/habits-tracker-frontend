import { useTranslation } from "react-i18next";
import { useLogHabit } from "../hooks/useHabits";
import type { Habit } from "@/interfaces/api";
import { getHabitColor } from "@/lib/habitColors";
import { toast } from "sonner";

interface Props {
  habits: Habit[];
  isLoading: boolean;
  completedMap: Record<number, boolean>;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const DashboardHabitList: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const logHabit = useLogHabit((badge) => {
    if (badge) {
      toast.success(`¡Insignia desbloqueada: ${badge.name}!`, {
        description: badge.description,
        icon: badge.icon,
      });
    }
  });

  const handleComplete = (habit: Habit, completedToday: boolean) => {
    if (completedToday) return;
    if (logHabit.isPending) return;
    logHabit.mutate(habit.id);
  };

  if (props.isLoading) {
    return (
      <div className="lg:col-span-2 space-y-[17px]">
        <div className="h-[21px] w-48 bg-canvas-parchment rounded animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-canvas border border-hairline p-[24px] rounded-[18px] animate-pulse h-[72px]"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="lg:col-span-2 space-y-[24px]">
        <div className="flex items-center justify-between pb-[12px] border-b border-hairline">
          <h2
            className="text-[21px] font-semibold text-ink leading-[1.19]"
            style={{ letterSpacing: "0.231px" }}
          >
            {t("app.dashboard.checkIns")}
          </h2>
          <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
            {new Date().toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>

        <div className="space-y-[12px]">
          {props.habits?.length === 0 && (
            <div className="text-center py-[48px] space-y-[12px]">
              <span className="material-symbols-outlined text-[48px] text-ink-muted-48">
                inventory_2
              </span>
              <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
                {t("app.dashboard.noHabits")}
              </p>
            </div>
          )}

          {props.habits?.map((habit, index) => {
            const { bgColor, textColor } = getHabitColor(index);
            const completedToday = props.completedMap[habit.id] ?? false;
            const isWeekly = habit.frequency === "weekly";

            return (
              <div
                key={habit.id}
                onClick={() => handleComplete(habit, completedToday)}
                className={`group bg-canvas p-[24px] rounded-[18px] border border-hairline flex items-center justify-between transition-all cursor-pointer
                  ${
                    completedToday
                      ? "opacity-50 cursor-default"
                      : "hover:border-primary/30 active:scale-[0.99]"
                  }`}
              >
                <div className="flex items-center gap-[17px]">
                  <div
                    className={`w-[44px] h-[44px] rounded-full ${bgColor} flex items-center justify-center ${textColor}`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {habit.icon ?? "task_alt"}
                    </span>
                  </div>

                  <div className="text-ink">
                    <h4 className="text-[17px] font-semibold leading-[1.24]">
                      {habit.name}
                    </h4>
                    <p className="text-[14px] text-ink-muted-48 mt-[2px] leading-[1.43]">
                      {habit.goal ?? habit.frequency}
                    </p>
                    <span
                      className={`text-[10px] font-bold font-label uppercase
              tracking-widest px-2 py-0.5 rounded-full
              ${
                isWeekly
                  ? "bg-surface-tile-1 text-on-dark"
                  : "bg-primary  text-on-dark"
              }`}
                    >
                      {isWeekly
                        ? t("app.habits.weekly")
                        : t("app.habits.daily")}
                    </span>
                  </div>
                </div>

                <div className="text-ink">
                  {/* Subtítulo — cambia si está completado semanalmente */}
                  <p className="text-sm text-outline mt-0.5">
                    {completedToday && isWeekly
                      ? t("app.habits.completedThisWeek") // "Completado esta semana"
                      : null}
                  </p>
                </div>

                <div
                  className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all
                  ${
                    completedToday
                      ? "bg-primary text-on-dark"
                      : "bg-surface-pearl border border-divider-soft group-hover:border-primary/50"
                  }
                  ${
                    logHabit.isPending && logHabit.variables === habit.id
                      ? "opacity-60"
                      : ""
                  }`}
                >
                  {completedToday && (
                    <span
                      className="material-symbols-outlined text-[20px]"
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

        {props.totalPages > 1 && (
          <div className="flex items-center justify-between pt-[17px]">
            <button
              onClick={props.onPrev}
              disabled={!props.hasPrev}
              className="flex items-center gap-[8px] text-[17px] text-primary font-normal leading-[1.47] disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-[0.95]"
            >
              <span className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
              {t("app.dashboard.prev")}
            </button>

            <div className="flex items-center gap-[8px]">
              {Array.from({ length: props.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <div
                    key={p}
                    className={`rounded-full transition-all
                  ${
                    p === props.page
                      ? "bg-ink w-[24px] h-[5px]"
                      : "bg-hairline w-[5px] h-[5px]"
                  }`}
                  />
                ),
              )}
            </div>

            <button
              onClick={props.onNext}
              disabled={!props.hasNext}
              className="flex items-center gap-[8px] text-[17px] text-primary font-normal leading-[1.47] disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-[0.95]"
            >
              {t("app.dashboard.next")}
              <span className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        )}
      </div>
      </>
  );
};
