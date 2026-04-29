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
        <span className="font-bold">{formatTo12h(time)}</span>
      </div>
      <button type="button" onClick={onRemove} className="text-error-dim">
        <span className="material-symbols-outlined">remove_circle_outline</span>
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
  onAdd: (time: string) => void; // ← cambia de () => void a (time: string) => void
  onRemove: (index: number) => void;
}) => {
  const { t } = useTranslation();

  // Estado interno — solo vive aquí, el padre no necesita saber
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTime, setSelectedTime] = useState("08:00");

  const handleConfirm = () => {
    if (!selectedTime) return;

    // Verificar que no esté duplicada
    if (reminders.includes(selectedTime)) {
      setIsAdding(false);
      return;
    }

    onAdd(selectedTime); // Manda la hora al padre
    setIsAdding(false); // Cierra el input
    setSelectedTime("08:00"); // Resetea para la próxima
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSelectedTime("08:00");
  };

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
        {/* Lista de recordatorios existentes — sin cambios */}
        {reminders.map((time, index) => (
          <ReminderRow
            key={time + index}
            time={time}
            onRemove={() => onRemove(index)}
          />
        ))}

        {/* Input inline — aparece al pulsar el botón */}
        {isAdding && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low border-2 border-primary-dim">
            <div className="w-10 h-10 rounded-full bg-secondary-dim flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-sm text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                schedule
              </span>
            </div>

            {/* Input nativo de hora — abre el reloj del sistema */}
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="flex-1 bg-transparent text-on-background font-bold text-base focus:outline-none"
              autoFocus
            />

            {/* Confirmar */}
            <button
              type="button"
              onClick={handleConfirm}
              className="text-primary-dim hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">check_circle</span>
            </button>

            {/* Cancelar */}
            <button
              type="button"
              onClick={handleCancel}
              className="text-error-dim hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">cancel</span>
            </button>
          </div>
        )}

        {/* Botón agregar — se oculta mientras el input está abierto */}
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="w-full py-4 border-2 border-dashed border-outline-variant rounded-xl text-outline font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>{t("formHabit.addNotificationTime")}</span>
          </button>
        )}
      </div>
    </section>
  );
};
