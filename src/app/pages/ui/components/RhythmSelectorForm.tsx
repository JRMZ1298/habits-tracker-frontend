import { useTranslation } from "react-i18next";

export const RhythmSelector = ({
  rhythm,
  onChange,
}: {
  rhythm: string;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface-container-low rounded-lg p-6">
      <label className="block text-[0.6875rem] font-bold text-on-surface-variant tracking-widest uppercase mb-6 font-label">
        {t("formHabit.rhythm")}
      </label>
      <div className="flex p-1 bg-surface-container-high rounded-full">
        {[
          { label: t("formHabit.daily"), value: "daily" },
          { label: t("formHabit.weekly"), value: "weekly" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 rounded-full transition-all ${
              rhythm === option.value
                ? "bg-surface-container-lowest text-on-background font-bold shadow-sm"
                : "text-on-surface-variant font-medium"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
};
