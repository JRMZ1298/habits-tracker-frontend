import { useTranslation } from "react-i18next";

interface SocialLoginButtonProps {
  text?: string;
}

export const SocialLoginButton = ({ text }: SocialLoginButtonProps) => {
  const { t } = useTranslation();
  const label = text ?? t("auth.social.loginGoogle");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full py-4 bg-surface-container-low text-ink font-bold rounded-full hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-3 border border-hairline"
    >
      <img
        alt="Google logo"
        className="w-5 h-5"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC56CxF7ENvXpRfSEXYjq0UXQ4Z1Ke-gCfp318SdfN4hMEgWHcSA7wwQChyG21aaNg9rx8rKaMcsugHOO9-qzCefIGKenRzUq0jZaxRjt1QVCQmvVXG2j9Xh9iXbt1O45VsywZAzVP-0x66tTPddVk8jLlXByvm-lBkDY2Abq9qolD7kJklWmfUuRNyT2Kwh9NML4xj7q-uLPZcM61f_jsrSSB1COeXeS_Ck5kbxL2QSoMQCTBY66MnFAxyFPIH0ZQkZKMJSlT8RUk"
      />
      <span>{label}</span>
    </button>
  );
};
