import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const HabitHeader = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="w-full max-w-4xl mb-12 flex justify-between items-end">
      <div>
        <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight font-headline">
          {isEditing ? t("formHabit.editTitle") : t("formHabit.title")}
        </h2>
        <p className="text-on-surface-variant font-label mt-2">
          {isEditing ? t("formHabit.editSubtitle") : t("formHabit.subtitle")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate(-1)} // Volver a la página anterior
        className="hidden md:flex p-3 rounded-full bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </header>
  );
};
