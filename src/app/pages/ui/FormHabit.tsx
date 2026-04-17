import { useState } from "react";
import { useTranslation } from "react-i18next";

const HabitHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full max-w-4xl mb-12 flex justify-between items-end">
      <div>
        <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight font-headline">
          {t("formHabit.title")}
        </h2>
        <p className="text-on-surface-variant font-label mt-2">
          {t("formHabit.subtitle")}
        </p>
      </div>
      <button className="hidden md:flex p-3 rounded-full bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors">
        <span className="material-symbols-outlined">close</span>
      </button>
    </header>
  );
};

const RhythmSelector = ({
  rhythm,
  onChange,
}: {
  rhythm: string;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface-container-low rounded-lg p-6">
      <label className="block text-[0.6875rem] font-bold text-on-surface-variant tracking-widest uppercase mb-6 font-label">
        {t("formHabit.rhythm")}
      </label>
      <div className="flex p-1 bg-surface-container-high rounded-full">
        {[
          { label: t("formHabit.daily"), value: "daily" },
          { label: t("formHabit.weekly"), value: "weekly" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 rounded-full transition-all ${
              rhythm === option.value
                ? "bg-surface-container-lowest text-on-background font-bold shadow-sm"
                : "text-on-surface-variant font-medium"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
};

const GoalInput = ({
  goal,
  onChange,
}: {
  goal: number;
  onChange: (value: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface-container-low rounded-lg p-6">
      <label className="block text-[0.6875rem] font-bold text-on-surface-variant tracking-widest uppercase mb-4 font-label">
        {t("formHabit.goalLabel")}
      </label>
      <div className="flex items-center gap-3">
        <input
          className="w-20 bg-surface-container-lowest border-none rounded-lg text-xl font-black text-center text-on-background py-2"
          type="number"
          value={goal}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="text-on-surface-variant font-medium">
          {t("formHabit.minutes")}
        </span>
      </div>
    </section>
  );
};

const ReminderRow = ({
  time,
  onRemove,
}: {
  time: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary-dim flex items-center justify-center text-on-primary-container">
          <span
            className="material-symbols-outlined text-sm text-white"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            schedule
          </span>
        </div>
        <span className="font-bold">{time}</span>
      </div>
      <button type="button" onClick={onRemove} className="text-error-dim">
        <span className="material-symbols-outlined">remove_circle_outline</span>
      </button>
    </div>
  );
};

const ReminderPanel = ({
  reminders,
  onAdd,
  onRemove,
}: {
  reminders: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface-container-lowest rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <label className="text-sm font-bold text-on-background tracking-widest uppercase font-label">
          {t("formHabit.nurtureReminders")}
        </label>
        <span className="material-symbols-outlined text-primary-dim">
          notifications_active
        </span>
      </div>
      <div className="space-y-4">
        {reminders.map((time, index) => (
          <ReminderRow
            key={time + index}
            time={time}
            onRemove={() => onRemove(index)}
          />
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="w-full py-4 border-2 border-dashed border-outline-variant rounded-xl text-outline font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>{t("formHabit.addNotificationTime")}</span>
        </button>
      </div>
    </section>
  );
};

const VisualSelector = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) => {
  const { t } = useTranslation();

  const icons = [
    { value: "spa", active: true },
    { value: "potted_plant" },
    { value: "eco" },
    { value: "psychology_alt" },
    { value: "water_drop" },
    { value: "self_improvement" },
    { value: "forest" },
    { value: "nature" },
  ];

  return (
    <section className="bg-surface-container-lowest rounded-lg p-8">
      <label className="block text-sm font-bold text-on-background tracking-widest uppercase mb-6 font-label">
        {t("formHabit.visualSpirit")}
      </label>
      <div className="grid grid-cols-4 gap-4">
        {icons.map((icon) => {
          const isActive = selected === icon.value;
          return (
            <button
              key={icon.value}
              type="button"
              onClick={() => onSelect(icon.value)}
              className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? "bg-on-background text-on-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-surface-container-low text-on-background hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {icon.value}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export const FormHabit = () => {
  const { t } = useTranslation();
  const [habitName, setHabitName] = useState("");
  const [rhythm, setRhythm] = useState("daily");
  const [goal, setGoal] = useState(30);
  const [selectedIcon, setSelectedIcon] = useState("spa");
  const [reminders, setReminders] = useState(["07:00 AM"]);

  const handleAddReminder = () => {
    setReminders((current) => [...current, "08:00 AM"]);
  };

  const handleRemoveReminder = (index: number) => {
    setReminders((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ habitName, rhythm, goal, selectedIcon, reminders });
  };

  return (
    <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
      <HabitHeader />
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-surface-container-lowest rounded-lg p-8 shadow-sm">
            <label className="block text-sm font-bold text-on-background tracking-widest uppercase mb-4 font-label">
              {t("formHabit.habitIdentity")}
            </label>
            <input
              className="w-full bg-transparent border-b-2 border-surface-container-high focus:border-on-background border-t-0 border-x-0 px-0 py-4 text-2xl font-bold placeholder:text-surface-variant focus:ring-0 transition-all outline-none"
              placeholder={t("formHabit.habitPlaceholder")}
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RhythmSelector rhythm={rhythm} onChange={setRhythm} />
            <GoalInput goal={goal} onChange={setGoal} />
          </div>

          <ReminderPanel
            reminders={reminders}
            onAdd={handleAddReminder}
            onRemove={handleRemoveReminder}
          />
        </div>

        <div className="lg:col-span-5 space-y-8">
          <VisualSelector selected={selectedIcon} onSelect={setSelectedIcon} />

          <div className="relative rounded-lg overflow-hidden h-64 group">
            <img
              alt={t("formHabit.habitPlaceholder")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLbBU9p9rHOiJbQfIQXXC1poEJ52R5ZSJHymPUQDyCyGXPk2zlYAHn7A15M7b7uFstBaLTVXyNXvVSqxnAtMlypZN0gqnVeZJIge8MlFUvQZt6a0mEcPT61Xe_VFz0A9Bh5kOK0JKGAD5D9XzjF_ZERQmp8mGOx80aujXGJI1nUkQ873XcxVpK2b-IvHndWBw7-M03cwzI7O866QJjDld9XHjMyAJk4VchJWT__aZlClTx_axZ3p5CdlMYy54kbPR1a81PnsBiMXI"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent flex items-end p-6">
              <p className="text-on-primary font-bold italic text-lg leading-tight">
                {t("formHabit.quote")}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-on-background text-on-primary py-6 rounded-full text-xl font-black shadow-xl shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-3 hover:opacity-90"
          >
            <span className="material-symbols-outlined">celebration</span>
            <span>{t("formHabit.cultivateHabit")}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
