import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

describe("SocialLoginButton", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "location",
      { href: "" },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders default text", async () => {
    const { SocialLoginButton } = await import(
      "@/auth/components/SocialLoginButton"
    );
    render(<SocialLoginButton />);
    expect(
      screen.getByText("Inicia sesión con Google"),
    ).toBeInTheDocument();
  });

  it("renders custom text", async () => {
    const { SocialLoginButton } = await import(
      "@/auth/components/SocialLoginButton"
    );
    render(<SocialLoginButton text="Custom text" />);
    expect(screen.getByText("Custom text")).toBeInTheDocument();
  });

  it("navigates to Google OAuth on click", async () => {
    const { SocialLoginButton } = await import(
      "@/auth/components/SocialLoginButton"
    );
    render(<SocialLoginButton />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(window.location.href).toBe(
      "http://localhost:8000/auth/google",
    );
  });
});
