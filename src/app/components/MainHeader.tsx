import { useLogout } from "@/auth/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const MainHeader = () => {
  const { t } = useTranslation();
  const logout = useLogout();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-surface text-surface-tint backdrop-blur-xl fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-6 py-4 mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold font-headline tracking-tight">
            {t("appName")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            className="hover:bg-surface-container rounded-full p-2 transition-colors duration-200 active:scale-95"
          >
            <span
              className={cn(
                theme !== "dark" ? "text-primary-focus" : "text-amber-400",
                "material-symbols-outlined",
              )}
            >
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Menú de usuario"
                className="rounded-full p-0 border-0 bg-transparent hover:bg-surface-container transition-colors duration-200"
              >
                <img
                  alt="User profile avatar"
                  className="w-8 h-8 rounded-full border-2 border-primary-container"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx1ye6NWu0isVXcxRWOIZODx_p2VFtuvRAcU73TJAmebwuVoLdBc6SMcsPR4UDF6awL1kwVw6OwtaNn-i_RMiMearaJcBMRyhjcadHymxbd2iccgERfckji0zZZT61qYAh-h3Qss6m_HIei2MDU0z1CMmg_aT7YlWn49jFQkWfLGtF_Qa4htUqxy8-FJGyb4CyWcqWa0LnchEX6b_cjlA8lipK8w0Dw-eqeseLNkNTS5MB9Ph8DeHR2UoM6u_eggWKXsHtO6560Uw"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("appName")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (window.location.href = "/app/settings")}
              >
                <span className="material-symbols-outlined mr-2 text-sm">
                  settings
                </span>
                {t("app.dashboard.settings")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <span className="material-symbols-outlined mr-2 text-sm">
                  logout
                </span>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
