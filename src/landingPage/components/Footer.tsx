import { useTranslation } from "react-i18next";

type LinkColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

type TextColumn = {
  heading?: string;
  items: string[];
};

type Column = LinkColumn | TextColumn;

const isLinkColumn = (column: Column): column is LinkColumn =>
  "links" in column;

export const Footer = () => {
  const { t } = useTranslation();

  const valuesHeading = t("landing.footer.values.heading");

  const valores = [
    t("landing.footer.values.accessibility"),
    t("landing.footer.values.education"),
    t("landing.footer.values.environment"),
    t("landing.footer.values.inclusion"),
    t("landing.footer.values.privacy"),
    t("landing.footer.values.supplyChain"),
  ];

  const chunkSize = Math.ceil(valores.length / 3);
  const valoresColumns: Column[] = Array.from({ length: 3 }, (_, i) => ({
    heading: i === 0 ? valuesHeading : undefined,
    items: valores.slice(i * chunkSize, (i + 1) * chunkSize),
  }));

  const footerColumns: Column[] = [
    {
      heading: t("landing.footer.account.heading"),
      links: [
        {
          label: t("landing.footer.account.manageAccount"),
          href: "/app/settings",
        },
        { label: t("landing.footer.account.signIn"), href: "/auth/login" },
      ],
    },
    ...valoresColumns,
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
          {footerColumns.map((column, index) => (
            <div key={index}>
              {column.heading ? (
                <h3 className="text-[14px] font-semibold text-ink leading-[1.29] tracking-[-0.224px] mb-[12px]">
                  {column.heading}
                </h3>
              ) : (
                <div className="w-full h-[28px]"></div>
              )}
              <ul className="space-y-[8px]">
                {isLinkColumn(column)
                  ? column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[17px] font-normal text-ink-muted-80 leading-[2.41] hover:text-primary transition-colors block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))
                  : column.items.map((item) => (
                      <li key={item}>
                        <span className="text-[17px] font-normal text-ink-muted-80 leading-[2.41] block">
                          {item}
                        </span>
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
