import { useTranslation } from "react-i18next";

export const DashboardStatsSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="space-y-8">
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl space-y-6">
        <h3 className="text-xl font-bold font-headline">
          {t("app.dashboard.weeklyView")}
        </h3>
        <div className="flex justify-between items-end h-32 gap-2">
          {[
            { day: "Dom", height: "40%", color: "bg-primary-container" },
            { day: "Lun", height: "90%", color: "bg-surface-tint" },
            { day: "Mar", height: "60%", color: "bg-primary-container" },
            { day: "Mie", height: "100%", color: "bg-primary" },
            { day: "Jue", height: "50%", color: "bg-primary-container" },
            { day: "Vie", height: "20%", color: "bg-outline-variant/20" },
            { day: "Sab", height: "10%", color: "bg-outline-variant/20" },
          ].map((bar) => (
            <div
              key={bar.day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className={`w-full ${bar.color} rounded-full`}
                style={{ height: bar.height }}
              />
              <span className="text-[10px] font-bold text-outline">
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden relative group cursor-pointer">
        <img
          alt="Yoga session"
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhDaSs7h614S0i69VLN_clObXjjWSwBRC-pWk6DwazbpVjGOlKdZiCiF7bQYcSk3bPUGCBmF0_2Onb5aO3dax7GN2mRAbhc69WlpxCxI2lL-G__jKyVBHWxkSSJ0PqFx8OgLNeJuypHL1DZudvNPbuuy2aGoCsnuU4tHbGWadA08do5LB_CXUOwwKnJTKDd0GMPhbqYwsOezOtSmqZX8xRe7QAy5pJnmzU2GN6VPVBdQUJPWc5qAY0fqi7QL49I8CvridHbnoeHAs"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent p-6 flex flex-col justify-end">
          <span className="text-xs font-bold text-on-primary/80 uppercase tracking-widest">
            {t("app.dashboard.recommended")}
          </span>
          <h4 className="text-lg font-bold text-on-primary">
            {t("app.dashboard.yogaFlow")}
          </h4>
        </div>
      </div>
    </aside>
  );
};
