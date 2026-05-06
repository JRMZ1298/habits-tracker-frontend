import { useTranslation } from "react-i18next";

export const ICONS = [
  { value: "favorite" as const },
  { value: "directions_run" as const },
  { value: "self_improvement" as const },
  { value: "exercise" as const },
  { value: "water_drop" as const },
  { value: "menu_book" as const },
  { value: "fork_spoon" as const },
  { value: "sleep" as const },
] as const;

export const VisualSelector = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[17px] block">
        {t("formHabit.visualSpirit")}
      </label>
      <div className="grid grid-cols-4 gap-[12px]">
        {ICONS.map((icon) => {
          const isActive = selected === icon.value;
          return (
            <button
              key={icon.value}
              type="button"
              onClick={() => onSelect(icon.value)}
              aria-label={`${t("formHabit.visualSpirit")}: ${icon.value}`}
              className={`aspect-square rounded-[18px] flex items-center justify-center transition-all border
                ${
                  isActive
                    ? "bg-ink border-ink"
                    : "bg-canvas-parchment border-hairline hover:border-ink-muted-48"
                }`}
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{
                  color: isActive ? "#ffffff" : "#1d1d1f",
                  fontVariationSettings: `'FILL' ${isActive ? 1 : 0}`,
                }}
              >
                {icon.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
