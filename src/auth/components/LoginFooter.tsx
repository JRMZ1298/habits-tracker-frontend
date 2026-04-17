import { useTranslation } from "react-i18next";

export const LoginFooter = () => {
  const { t } = useTranslation();

  const links = [
    { key: "auth.footer.privacy", href: "#" },
    { key: "auth.footer.terms", href: "#" },
    { key: "auth.footer.contact", href: "#" },
    { key: "auth.footer.twitter", href: "#" },
    { key: "auth.footer.instagram", href: "#" },
  ];

  return (
    <footer className="bg-surface-container-low rounded-t-xl mt-20 flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <span className="text-xl font-black text-primary tracking-tighter">
          {t("landing.footer.brand")}
        </span>
        <p className="font-label text-sm text-on-surface-variant opacity-80">
          {t("landing.footer.copyright")}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {links.map((link) => (
          <a
            key={link.key}
            className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
            href={link.href}
          >
            {t(link.key)}
          </a>
        ))}
      </div>
    </footer>
  );
};
