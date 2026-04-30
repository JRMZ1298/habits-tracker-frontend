import { useTranslation } from "react-i18next";

export const VisualSelector = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) => {
  const { t } = useTranslation();

  const icons = [
    { value: "favorite", active: true },
    { value: "directions_run" },
    { value: "self_improvement" },
    { value: "exercise" },
    { value: "water_drop" },
    { value: "menu_book" },
    { value: "fork_spoon" },
    { value: "sleep" },
  ];

  return (
    <section className="bg-surface-container-lowest rounded-lg p-8">
      <label className="block text-sm font-bold text-on-background tracking-widest uppercase mb-6 font-label">
        {t("formHabit.visualSpirit")}
      </label>
      <div className="grid grid-cols-4 gap-4">
        {icons.map((icon) => {
          const isActive = selected === icon.value;
          return (
            <button
              key={icon.value}
              type="button"
              onClick={() => onSelect(icon.value)}
              className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? "bg-on-background text-on-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-surface-container-low text-on-background hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {icon.value}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
