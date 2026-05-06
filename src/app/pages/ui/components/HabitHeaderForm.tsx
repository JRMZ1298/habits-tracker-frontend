import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const HabitHeader = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="w-full max-w-[980px] mb-[32px] flex justify-between items-end pt-[32px]">
      <div className="space-y-[4px]">
        <h2
          className="text-[40px] font-semibold text-ink leading-[1.1]"
          style={{ letterSpacing: "-0.28px" }}
        >
          {isEditing ? t("formHabit.editTitle") : t("formHabit.title")}
        </h2>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {isEditing ? t("formHabit.editSubtitle") : t("formHabit.subtitle")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="hidden md:flex w-[44px] h-[44px] rounded-full bg-canvas-parchment items-center justify-center transition-transform active:scale-[0.95]"
      >
        <span className="material-symbols-outlined text-[20px] text-ink">
          close
        </span>
      </button>
    </header>
  );
};
