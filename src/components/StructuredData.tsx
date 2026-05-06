import { useTranslation } from "react-i18next";

interface StructuredDataProps {
  type?: "WebSite" | "BreadcrumbList";
  breadcrumbItems?: Array<{ name: string; url: string }>;
}

export const StructuredData = ({ type = "WebSite", breadcrumbItems }: StructuredDataProps) => {
  const { t } = useTranslation();

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vitality",
    description: t("landing.hero.headlinePart1") + " " + t("landing.hero.headlinePart2"),
    url: baseUrl,
    inLanguage: "es-MX",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/app/habits?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${baseUrl}/home`,
      },
      ...(breadcrumbItems?.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${baseUrl}${item.url}`,
      })) || []),
    ],
  };

  const schema = type === "BreadcrumbList" && breadcrumbItems?.length ? breadcrumbSchema : webSiteSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
