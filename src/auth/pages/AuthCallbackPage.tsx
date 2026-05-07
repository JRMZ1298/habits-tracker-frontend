import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useSearchParams } from "react-router";

export const AuthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const error = params.get("error");

    if (error || !token) {
      navigate("/login?error=google_failed");
      return;
    }

    setAuth(token, { name: name ?? "Usuario", email: email ?? "Email" });
    navigate("/app/dashboard");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-5xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-label">
          Iniciando sesión...
        </p>
      </div>
    </div>
  );
};
