import { useLogout } from "@/auth/hooks/useAuth";
import { useTranslation } from "react-i18next";

export const MainHeader = () => {
  const { t } = useTranslation();
  const logout = useLogout();

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
          <button className=" hover:bg-surface-container rounded-full p-2 transition-colors duration-200 active:scale-95">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className=" hover:bg-surface-container rounded-full p-2 transition-colors duration-200 active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <img
            alt="User profile avatar"
            className="w-8 h-8 rounded-full border-2 border-primary-container"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx1ye6NWu0isVXcxRWOIZODx_p2VFtuvRAcU73TJAmebwuVoLdBc6SMcsPR4UDF6awL1kwVw6OwtaNn-i_RMiMearaJcBMRyhjcadHymxbd2iccgERfckji0zZZT61qYAh-h3Qss6m_HIei2MDU0z1CMmg_aT7YlWn49jFQkWfLGtF_Qa4htUqxy8-FJGyb4CyWcqWa0LnchEX6b_cjlA8lipK8w0Dw-eqeseLNkNTS5MB9Ph8DeHR2UoM6u_eggWKXsHtO6560Uw"
          />
          <button
            className="text-white bg-red-800 hover:bg-red-950 rounded-full p-2 transition-colors duration-200 active:scale-95"
            onClick={handleLogout}
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </header>
  );
};
