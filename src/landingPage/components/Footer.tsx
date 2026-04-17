import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const links = [
    { key: "landing.footer.privacy", href: "#" },
    { key: "landing.footer.terms", href: "#" },
    { key: "landing.footer.contact", href: "#" },
    { key: "landing.footer.twitter", href: "#" },
    { key: "landing.footer.instagram", href: "#" },
  ];

  return (
    <footer className="bg-[#c4fedd] w-full rounded-t-[3rem] mt-20 flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 text-[#006a35] font-[Manrope] text-sm">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <span className="text-xl font-black">{t("landing.footer.brand")}</span>
        <p className="opacity-80 max-w-[12.5rem] text-center md:text-left">
          {t("landing.footer.copyright")}
        </p>
      </div>
      <nav className="flex flex-wrap justify-center gap-8">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="text-[#006893] opacity-80 hover:text-[#006a35] transition-colors"
          >
            {t(link.key)}
          </a>
        ))}
      </nav>
      <div className="flex gap-4">
        <button className="w-10 h-10 rounded-full bg-[#006a35]/10 flex items-center justify-center hover:bg-[#006a35]/20 transition-colors">
          <span className="material-symbols-outlined text-sm">globe</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#006a35]/10 flex items-center justify-center hover:bg-[#006a35]/20 transition-colors">
          <span className="material-symbols-outlined text-sm">dark_mode</span>
        </button>
      </div>
    </footer>
  );
};
