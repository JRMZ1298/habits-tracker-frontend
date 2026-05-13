import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

export const HabitsManagement: React.FC<Props> = ({ search, onSearch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enfocar el input cuando abre
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onSearch(""); // Limpiar búsqueda al cerrar
  };

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
        {/* Botón que se convierte en input */}
        <div className="relative">
          <div
            className={`flex items-center gap-[6px] bg-surface-pearl
              border border-primary rounded-[11px] px-[14px] py-[8px]
              transition-all duration-300 ease-in-out ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
              search
            </span>

            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t("app.habits.searchPlaceholder")}
              className="bg-transparent text-ink text-[14px] leading-[1.29]
                tracking-[-0.224px] outline-none w-[180px] placeholder:text-ink-muted-48"
              onKeyDown={(e) => e.key === "Escape" && handleClose()}
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearch("")}
                className="text-ink-muted-48 hover:text-ink transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="text-ink-muted-48 hover:text-ink transition-colors ml-1"
            >
              <span className="material-symbols-outlined text-[16px]">keyboard_return</span>
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`absolute right-0 top-0 bg-surface-pearl text-ink-muted-80 text-[14px]
              leading-[1.29] tracking-[-0.224px] px-[14px] py-[8px]
              rounded-[11px] border border-divider-soft whitespace-nowrap
              transition-all duration-300 ease-in-out flex items-center gap-[6px] ${
                open
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            {t("app.habits.search")}
          </button>
        </div>

        <button
          onClick={() => navigate("/app/habits/new")}
          className="md:hidden bg-ink text-on-dark text-[14px] leading-[1.29]
            tracking-[-0.224px] px-[15px] py-[8px] rounded-[8px]
            transition-transform active:scale-[0.95] flex items-center gap-[6px]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          {t("app.habits.newHabit")}
        </button>
      </div>
    </div>
  );
};
