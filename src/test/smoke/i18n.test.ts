import i18n from "@/i18n";

describe("i18n setup", () => {
  it("uses es-MX locale", () => {
    expect(i18n.language).toBe("es-MX");
  });

  it("has landing page translations", () => {
    const t = i18n.t;
    expect(t("appName")).toBe("Vitality");
    expect(t("landing.nav.features")).toBe("Características");
  });

  it("has auth translations", () => {
    const t = i18n.t;
    expect(t("auth.login.welcome")).toBe("Bienvenido de nuevo");
  });

  it("has app translations", () => {
    const t = i18n.t;
    expect(t("app.dashboard.heading")).toBe("Bienvenido, ");
  });
});
