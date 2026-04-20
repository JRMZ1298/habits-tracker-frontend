import { useTranslation } from "react-i18next";

export const DashboardHabitList = () => {
  const { t } = useTranslation();

  const habits = [
    {
      id: 1,
      icon: "fitness_center",
      title: t("app.dashboard.habitMorningExercise"),
      subtitle: t("app.dashboard.habitMorningExerciseSubtitle"),
      completed: true,
      bgColor: "bg-primary-container",
      textColor: "text-surface-tint",
    },
    {
      id: 2,
      icon: "menu_book",
      title: t("app.dashboard.habitReadingSession"),
      subtitle: t("app.dashboard.habitReadingSessionSubtitle"),
      completed: false,
      bgColor: "bg-secondary-container",
      textColor: "text-secondary",
    },
    {
      id: 3,
      icon: "self_improvement",
      title: t("app.dashboard.habitMindfulBreathing"),
      subtitle: t("app.dashboard.habitMindfulBreathingSubtitle"),
      completed: false,
      bgColor: "bg-tertiary-container",
      textColor: "text-tertiary",
    },
  ];

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-on-background font-headline">
          {t("app.dashboard.checkIns")}
        </h2>
        <span className="text-label text-xs font-bold text-outline uppercase tracking-widest">
          {t("app.dashboard.todayDate")}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between group cursor-pointer transition-all hover:bg-surface-container"
          >
            <div className="flex items-center gap-6">
              <div
                className={`w-14 h-14 rounded-full ${habit.bgColor} flex items-center justify-center ${habit.textColor}`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {habit.icon}
                </span>
              </div>
              <div className="text-on-background">
                <h4 className="text-lg font-bold">{habit.title}</h4>
                <p className="text-sm text-outline">{habit.subtitle}</p>
              </div>
            </div>
            <div
              className={`w-10 h-10 rounded-full ${habit.completed ? "bg-surface-tint text-on-primary" : "border-2 border-outline-variant group-hover:border-surface-tint"} flex items-center justify-center transition-colors`}
            >
              {habit.completed && (
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
