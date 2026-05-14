import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SocialLoginButton } from "./SocialLoginButton";
import { Link } from "react-router";
import { useLogin } from "../hooks/useAuth";
import type { LoginForm as LoginFormType } from "@/interfaces/forms";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const LoginForm = () => {
  const { t } = useTranslation();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: LoginFormType) => {
    login(data);
  };

  return (
    <div className="rounded-xl p-8 md:p-10 shadow-sm border border-hairline bg-surface-container-low backdrop-blur-xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-ink tracking-tight">
          {t("auth.login.welcome")}
        </h2>
        <p className="text-ink-muted-48 font-label mt-2">
          {t("auth.login.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-bold text-ink-muted-48 font-label ml-1"
          >
            {t("auth.login.emailLabel")}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted-48">
              mail
            </span>
            <input
              id="email"
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              {...register("email")}
              className={`w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded text-ink placeholder:text-ink-muted-48 focus:ring-2 focus:ring-primary-fixed transition-all font-body ${
                errors.email ? "ring-2 ring-destructive" : ""
              }`}
            />
          </div>
          {errors.email && (
            <p
              className="text-destructive text-xs font-label ml-1"
              role="alert"
              aria-live="polite"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-ink-muted-48 font-label"
            >
              {t("auth.login.passwordLabel")}
            </label>
            <a
              href="#"
              className="text-xs font-bold text-surface-tint hover:text-ink-muted-48 transition-colors font-label"
            >
              {t("auth.login.forgotPassword")}
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted-48">
              lock
            </span>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded text-ink placeholder:text-ink-muted-48 focus:ring-2 focus:ring-primary-fixed transition-all font-body ${
                errors.password ? "ring-2 ring-destructive" : ""
              }`}
            />
          </div>
          {errors.password && (
            <p
              className="text-destructive text-xs font-label ml-1"
              role="alert"
              aria-live="polite"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-primary-dim text-white font-bold rounded-full hover:bg-primary-focus transition-all active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>
            {isPending
              ? t("auth.login.loggingIn", "Iniciando sesión...")
              : t("auth.login.loginButton")}
          </span>
          <span className="material-symbols-outlined text-[18px]">
            {isPending ? "hourglass_empty" : "arrow_forward"}
          </span>
        </button>
      </form>

      <div className="relative my-8">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-hairline"></div>
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-surface-container-low px-4 text-ink-muted-48 font-label">
            {t("auth.login.continueWith")}
          </span>
        </div>
      </div>

      <SocialLoginButton />

      <div className="mt-10 text-center">
        <p className="text-ink-muted-48 font-label text-sm">
          {t("auth.login.noAccount")}{" "}
          <Link
            to="/auth/registro"
            className="text-surface-tint font-bold hover:underline transition-all"
          >
            {t("auth.login.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
};
