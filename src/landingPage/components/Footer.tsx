import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const footerColumns = [
    {
      heading: t("landing.footer.shopAndLearn.heading"),
      links: [
        { label: t("landing.footer.shopAndLearn.habits"), href: "#features" },
        { label: t("landing.footer.shopAndLearn.metrics"), href: "#features" },
        { label: t("landing.footer.shopAndLearn.badges"), href: "#features" },
        { label: t("landing.footer.shopAndLearn.settings"), href: "#features" },
      ],
    },
    {
      heading: t("landing.footer.account.heading"),
      links: [
        { label: t("landing.footer.account.manageAccount"), href: "/app/settings" },
        { label: t("landing.footer.account.signIn"), href: "/auth/login" },
      ],
    },
    {
      heading: t("landing.footer.about.heading"),
      links: [
        { label: t("landing.footer.about.newsroom"), href: "#" },
        { label: t("landing.footer.about.leadership"), href: "#" },
        { label: t("landing.footer.about.workOpportunities"), href: "#" },
        { label: t("landing.footer.about.investors"), href: "#" },
        { label: t("landing.footer.about.ethicsCompliance"), href: "#" },
      ],
    },
    {
      heading: t("landing.footer.values.heading"),
      links: [
        { label: t("landing.footer.values.accessibility"), href: "#" },
        { label: t("landing.footer.values.education"), href: "#" },
        { label: t("landing.footer.values.environment"), href: "#" },
        { label: t("landing.footer.values.inclusion"), href: "#" },
        { label: t("landing.footer.values.privacy"), href: "#" },
        { label: t("landing.footer.values.supplyChain"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-canvas-parchment py-[64px]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Legal fine print top */}
        <p className="text-[12px] font-normal text-ink-muted-48 leading-[1.0] tracking-[-0.12px] mb-[24px]">
          {t("landing.footer.legal")}
        </p>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] mb-[48px]">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[14px] font-semibold text-ink leading-[1.29] tracking-[-0.224px] mb-[12px]">
                {column.heading}
              </h3>
              <ul className="space-y-[8px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[17px] font-normal text-ink-muted-80 leading-[2.41] hover:text-primary transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline pt-[24px] flex flex-col md:flex-row justify-between items-center gap-[16px]">
          <p className="text-[12px] font-normal text-ink-muted-48 leading-[1.0] tracking-[-0.12px]">
            {t("landing.footer.copyright")}
          </p>
          <div className="flex items-center gap-[20px]">
            <a
              href="#"
              className="text-[17px] font-normal text-ink-muted-80 leading-[2.41] hover:text-primary transition-colors"
            >
              {t("landing.footer.privacy")}
            </a>
            <a
              href="#"
              className="text-[17px] font-normal text-ink-muted-80 leading-[2.41] hover:text-primary transition-colors"
            >
              {t("landing.footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
