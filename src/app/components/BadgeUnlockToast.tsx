import { useEffect } from "react";

interface BadgeToastProps {
  badge: { name: string; icon: string; description: string } | null;
  onClose: () => void;
}

export const BadgeUnlockToast = ({ badge, onClose }: BadgeToastProps) => {
  useEffect(() => {
    if (!badge) return;
    const timer = setTimeout(onClose, 4000); // Auto-cierra en 4 segundos
    return () => clearTimeout(timer);
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xl flex items-center gap-4 border border-outline-variant min-w-72">
        <div className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-3xl text-tertiary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {badge.icon}
          </span>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-tertiary font-label">
            ¡Insignia desbloqueada!
          </p>
          <p className="font-bold text-on-background">{badge.name}</p>
          <p className="text-xs text-outline">{badge.description}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-outline hover:text-on-background"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
