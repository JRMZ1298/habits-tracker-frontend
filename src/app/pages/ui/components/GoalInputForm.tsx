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
    <section className="bg-surface-container-low rounded-lg p-6">
      <label className="block text-[0.6875rem] font-bold text-on-surface-variant tracking-widest uppercase mb-4 font-label">
        {t("formHabit.goalLabel")}
      </label>
      <div className="flex items-center gap-3">
        <input
          className="w-48 bg-surface-container-lowest border-none rounded-lg text-xl font-black text-center text-on-background py-2"
          type="text"
          value={goal}
          min={0}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  );
};
