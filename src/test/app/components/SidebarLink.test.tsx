import { render, screen } from "@/test/test-utils";

describe("SidebarLink", () => {
  it("renders translated text", async () => {
    const { SidebarLink } = await import("@/app/components/SidebarLink");
    render(<SidebarLink to="/app" icon="home" translationKey="app.dashboard.dashboard" />);
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("renders icon", async () => {
    const { SidebarLink } = await import("@/app/components/SidebarLink");
    render(<SidebarLink to="/app" icon="home" translationKey="app.dashboard.dashboard" />);
    expect(screen.getByText("home")).toBeInTheDocument();
  });

  it("is active when pathname matches", async () => {
    const { SidebarLink } = await import("@/app/components/SidebarLink");
    render(
      <SidebarLink to="/" icon="home" translationKey="app.dashboard.dashboard" />,
      { initialEntries: ["/"] },
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("text-primary-focus");
  });

  it("is not active when pathname differs", async () => {
    const { SidebarLink } = await import("@/app/components/SidebarLink");
    render(
      <SidebarLink to="/other" icon="home" translationKey="app.dashboard.dashboard" />,
      { initialEntries: ["/"] },
    );
    const link = screen.getByRole("link");
    expect(link.className).not.toContain("text-primary-focus");
  });
});
