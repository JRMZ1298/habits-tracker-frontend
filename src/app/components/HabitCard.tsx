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
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
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
  onEdit,
  onDelete,
  isDeleting,
}: HabitCardProps) => {
  return (
    <div className="bg-canvas border border-hairline rounded-[18px] p-[24px] group transition-all">
      <div className="flex justify-between items-start mb-[17px]">
        <div className="flex items-center gap-[12px]">
          <div
            className={`w-[44px] h-[44px] rounded-full ${categoryColor} flex items-center justify-center`}
          >
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
          </div>
          <div>
            <h4 className="text-[17px] font-semibold text-ink leading-[1.24]">
              {title}
            </h4>
            <span className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
              {category}
            </span>
          </div>
        </div>
        <div className="flex gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-[8px] text-ink-muted-48 hover:text-primary transition-colors rounded-[8px]"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-[8px] text-ink-muted-48 hover:text-destructive transition-colors rounded-[8px] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDeleting ? "hourglass_empty" : "delete"}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-[8px]">
        <div className="flex gap-[4px]">
          {Array.from({ length: totalBars }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-[5px] rounded-[5px] ${
                i < completedBars ? "bg-ink" : "bg-canvas-parchment"
              }`}
            />
          ))}
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[14px] text-ink-muted-48 leading-[1.43]">
            {frequency} &middot; {progress}
          </p>
          <span
            className={`text-[21px] font-semibold leading-[1.19] ${
              percentage === 0
                ? "text-ink-muted-48"
                : "text-ink"
            }`}
            style={{ letterSpacing: "0.231px" }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
