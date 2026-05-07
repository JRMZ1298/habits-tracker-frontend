import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

interface SidebarLinkProps {
  to: string;
  icon: string;
  translationKey: string;
  fillIcon?: boolean;
  onClick?: () => void;
}

export const SidebarLink = ({
  to,
  icon,
  translationKey,
  fillIcon = false,
  onClick,
}: SidebarLinkProps) => {
  const { t } = useTranslation();
  const pathname = useLocation();

  const isActive = pathname.pathname === to;

  return (
    <Link
      className={`flex items-center gap-3 px-4 py-3 text-ink-muted-48 rounded-full font-headline text-sm font-semibold hover:translate-x-1 transition-transform duration-200 active:scale-95 md:justify-center md:px-2 lg:justify-start lg:px-4 md:hover:translate-x-0 lg:hover:translate-x-1 ${
        isActive
          ? "text-primary-focus bg-surface-container-lowest shadow-sm"
          : "opacity-80"
      }`}
      to={to}
      title={t(translationKey)}
      onClick={onClick}
    >
      <span
        className="material-symbols-outlined"
        style={fillIcon ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {icon}
      </span>
      <span className="inline md:hidden lg:inline">{t(translationKey)}</span>
    </Link>
  );
};
