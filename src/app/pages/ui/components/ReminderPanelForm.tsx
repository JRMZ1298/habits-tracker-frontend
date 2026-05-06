import { formatTo12h } from "@/lib/timeFormat";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReminderRow = ({
  time,
  onRemove,
}: {
  time: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-between py-[12px] border-b border-hairline last:border-b-0">
      <div className="flex items-center gap-[12px]">
        <span className="material-symbols-outlined text-[20px] text-ink-muted-48">
          schedule
        </span>
        <span className="text-[17px] text-ink font-normal leading-[1.24]">
          {formatTo12h(time)}
        </span>
      </div>
       <button
         type="button"
         onClick={onRemove}
         aria-label="Eliminar recordatorio"
         className="text-primary transition-transform active:scale-[0.95]"
       >
         <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
           remove_circle
         </span>
       </button>
    </div>
  );
};

export const ReminderPanel = ({
  reminders,
  onAdd,
  onRemove,
}: {
  reminders: string[];
  onAdd: (time: string) => void;
  onRemove: (index: number) => void;
}) => {
  const { t } = useTranslation();

  const [isAdding, setIsAdding] = useState(false);
  const [selectedTime, setSelectedTime] = useState("08:00");

  const handleConfirm = () => {
    if (!selectedTime) return;
    if (reminders.includes(selectedTime)) {
      setIsAdding(false);
      return;
    }
    onAdd(selectedTime);
    setIsAdding(false);
    setSelectedTime("08:00");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSelectedTime("08:00");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-[17px]">
        <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
          {t("formHabit.nurtureReminders")}
        </label>
        <span className="material-symbols-outlined text-[20px] text-primary">
          notifications_active
        </span>
      </div>

      <div className="space-y-[4px]">
        {/* Existing reminders */}
        {reminders.map((time, index) => (
          <ReminderRow
            key={time + index}
            time={time}
            onRemove={() => onRemove(index)}
          />
        ))}

        {/* Inline add input */}
        {isAdding && (
          <div className="flex items-center gap-[12px] py-[12px] border-b border-hairline">
            <span className="material-symbols-outlined text-[20px] text-primary">
              schedule
            </span>

            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="flex-1 bg-transparent text-[17px] text-ink leading-[1.24] focus-visible:outline-none"
              autoFocus
            />

             <button
               type="button"
               onClick={handleConfirm}
               aria-label="Confirmar hora"
               className="text-primary transition-transform active:scale-[0.95]"
             >
               <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                 check_circle
               </span>
             </button>

             <button
               type="button"
               onClick={handleCancel}
               aria-label="Cancelar"
               className="text-ink-muted-48 transition-transform active:scale-[0.95]"
             >
               <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                 cancel
               </span>
             </button>
          </div>
        )}

        {/* Add button */}
        {!isAdding && (
         <button
           type="button"
           onClick={() => setIsAdding(true)}
           aria-label={t("formHabit.addNotificationTime")}
           className="w-full py-[12px] flex items-center justify-center gap-[8px] text-[17px] text-primary font-normal leading-[1.47] transition-transform active:scale-[0.99]"
         >
           <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
             add_circle
           </span>
           <span>{t("formHabit.addNotificationTime")}</span>
         </button>
        )}
      </div>
    </div>
  );
};
