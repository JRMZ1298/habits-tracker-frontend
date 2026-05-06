import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const HabitsManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-[17px] pb-[24px] border-b border-hairline">
      <div className="space-y-[4px]">
        <h3
          className="text-[28px] font-semibold text-ink leading-[1.14]"
          style={{ letterSpacing: "0.196px" }}
        >
          {t("app.habits.activeHabits")}
        </h3>
        <p className="text-[17px] text-ink-muted-48 leading-[1.47]">
          {t("app.habits.description")}
        </p>
      </div>
      <div className="flex gap-[8px]">
        <button className="bg-surface-pearl text-ink-muted-80 text-[14px] leading-[1.29] tracking-[-0.224px] px-[14px] py-[8px] rounded-[11px] border border-divider-soft transition-transform active:scale-[0.95] flex items-center gap-[6px]">
          <span className="material-symbols-outlined text-[16px]">
            filter_list
          </span>
          {t("app.habits.filter")}
        </button>
        <button
          onClick={() => navigate("/app/habits/new")}
          className="md:hidden bg-ink text-on-dark text-[14px] leading-[1.29] tracking-[-0.224px] px-[15px] py-[8px] rounded-[8px] transition-transform active:scale-[0.95] flex items-center gap-[6px]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          {t("app.habits.newHabit")}
        </button>
      </div>
    </div>
  );
};
