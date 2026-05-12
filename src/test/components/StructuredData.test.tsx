import { render } from "@/test/test-utils";

describe("StructuredData", () => {
  it("renders WebSite schema by default", async () => {
    const { StructuredData } = await import(
      "@/components/StructuredData"
    );
    const { container } = render(<StructuredData />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script!.innerHTML);
    expect(json["@type"]).toBe("WebSite");
    expect(json.name).toBe("Vitality");
  });

  it("renders BreadcrumbList schema when type and items provided", async () => {
    const { StructuredData } = await import(
      "@/components/StructuredData"
    );
    const { container } = render(
      <StructuredData
        type="BreadcrumbList"
        breadcrumbItems={[
          { name: "Hábitos", url: "/app/habits" },
        ]}
      />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script!.innerHTML);
    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(2);
    expect(json.itemListElement[1].name).toBe("Hábitos");
  });

  it("renders WebSite when BreadcrumbList has no items", async () => {
    const { StructuredData } = await import(
      "@/components/StructuredData"
    );
    const { container } = render(
      <StructuredData type="BreadcrumbList" />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const json = JSON.parse(script!.innerHTML);
    expect(json["@type"]).toBe("WebSite");
  });
});
