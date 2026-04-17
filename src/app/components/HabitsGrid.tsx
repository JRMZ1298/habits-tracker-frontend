import { useTranslation } from "react-i18next";
import { HabitCard } from "./HabitCard";

export const HabitsGrid = () => {
  const { t } = useTranslation();

  const habits = [
    {
      icon: "water_drop",
      title: t("app.habits.hydration"),
      category: t("app.habits.mindfulness") ?? "Mindfulness",
      categoryColor: "bg-secondary-container text-on-secondary-container",
      frequency: t("app.habits.daily"),
      progress: t("app.habits.progress1"),
      percentage: 80,
      completedBars: 4,
      totalBars: 5,
    },
    {
      icon: "directions_run",
      title: t("app.habits.energy"),
      category: t("app.habits.energy"),
      categoryColor: "bg-tertiary-container text-on-tertiary-container",
      frequency: t("app.habits.weekly"),
      progress: t("app.habits.progress2"),
      percentage: 66,
      completedBars: 2,
      totalBars: 3,
    },
    {
      icon: "menu_book",
      title: t("app.habits.growth"),
      category: t("app.habits.growth"),
      categoryColor: "bg-primary-container text-on-primary-container",
      frequency: t("app.habits.daily"),
      progress: t("app.habits.progress3"),
      percentage: 100,
      completedBars: 5,
      totalBars: 5,
    },
    {
      icon: "self_improvement",
      title: t("app.habits.stillness") ?? "Stillness",
      category: t("app.habits.mindfulness") ?? "Mindfulness",
      categoryColor: "bg-secondary-container text-on-secondary-container",
      frequency: t("app.habits.daily"),
      progress: t("app.habits.progress4"),
      percentage: 0,
      completedBars: 0,
      totalBars: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {habits.map((habit, index) => (
        <HabitCard key={index} {...habit} />
      ))}
    </div>
  );
};
