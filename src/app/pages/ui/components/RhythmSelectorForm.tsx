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
    <section className="bg-canvas border border-hairline rounded-[18px] p-[24px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[12px] block">
        {t("formHabit.rhythm")}
      </label>
      <div className="flex p-[4px] bg-canvas-parchment rounded-[11px]">
        {[
          { label: t("formHabit.daily"), value: "daily" },
          { label: t("formHabit.weekly"), value: "weekly" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 py-[8px] rounded-[8px] text-[14px] tracking-[-0.224px] transition-all
              ${
                rhythm === option.value
                  ? "bg-canvas text-ink shadow-sm font-normal"
                  : "text-ink-muted-48"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
};
