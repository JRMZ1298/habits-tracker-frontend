interface SocialLoginButtonProps {
  text?: string;
}

export const SocialLoginButton = ({
  text = "Login with Google",
}: SocialLoginButtonProps) => {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-full hover:bg-secondary-fixed-dim transition-all active:scale-95 flex items-center justify-center gap-3"
    >
      <img
        alt="Google logo"
        className="w-5 h-5"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC56CxF7ENvXpRfSEXYjq0UXQ4Z1Ke-gCfp318SdfN4hMEgWHcSA7wwQChyG21aaNg9rx8rKaMcsugHOO9-qzCefIGKenRzUq0jZaxRjt1QVCQmvVXG2j9Xh9iXbt1O45VsywZAzVP-0x66tTPddVk8jLlXByvm-lBkDY2Abq9qolD7kJklWmfUuRNyT2Kwh9NML4xj7q-uLPZcM61f_jsrSSB1COeXeS_Ck5kbxL2QSoMQCTBY66MnFAxyFPIH0ZQkZKMJSlT8RUk"
      />
      <span>{text}</span>
    </button>
  );
};
