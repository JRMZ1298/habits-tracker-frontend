import { render, screen } from "@/test/test-utils";

describe("LoginFooter", () => {
  it("renders brand name", async () => {
    const { LoginFooter } = await import("@/auth/components/LoginFooter");
    render(<LoginFooter />);
    expect(screen.getByText("Vitality")).toBeInTheDocument();
  });

  it("renders copyright", async () => {
    const { LoginFooter } = await import("@/auth/components/LoginFooter");
    render(<LoginFooter />);
    expect(
      screen.getByText("© 2024 Vitality Framework. Crece con intención."),
    ).toBeInTheDocument();
  });

  it("renders footer links", async () => {
    const { LoginFooter } = await import("@/auth/components/LoginFooter");
    render(<LoginFooter />);
    expect(
      screen.getByText("Política de privacidad"),
    ).toBeInTheDocument();
    expect(screen.getByText("Términos de servicio")).toBeInTheDocument();
    expect(screen.getByText("Contáctanos")).toBeInTheDocument();
  });
});
