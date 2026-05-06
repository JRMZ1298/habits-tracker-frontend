import { useTranslation } from "react-i18next";

export const GoalInput = ({
  goal,
  onChange,
}: {
  goal: string;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-canvas border border-hairline rounded-[18px] p-[24px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[12px] block">
        {t("formHabit.goalLabel")}
      </label>
      <input
        className="w-full bg-canvas-parchment text-[17px] text-ink leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-transparent focus:border-primary outline-none transition-colors"
        type="text"
        value={goal}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
};
