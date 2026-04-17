interface HabitCardProps {
  icon: string;
  title: string;
  category: string;
  categoryColor: string;
  frequency: string;
  progress: string;
  percentage: number;
  completedBars: number;
  totalBars: number;
}

export const HabitCard = ({
  icon,
  title,
  category,
  categoryColor,
  frequency,
  progress,
  percentage,
  completedBars,
  totalBars,
}: HabitCardProps) => {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 group transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl ${categoryColor} flex items-center justify-center`}
          >
            <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-on-background">{title}</h4>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              {category}
            </span>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-on-background hover:text-secondary-dim transition-colors">
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
          <button className="p-2 text-on-background hover:text-error transition-colors">
            <span className="material-symbols-outlined text-xl">delete</span>
          </button>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: totalBars }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full ${i < completedBars ? "bg-on-background" : "bg-surface-container-high"}`}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-on-surface-variant">
            {frequency} • {progress}
          </p>
        </div>
        <span
          className={`text-2xl font-black ${percentage === 0 ? "text-on-surface-variant opacity-30" : "text-on-background"}`}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
};
