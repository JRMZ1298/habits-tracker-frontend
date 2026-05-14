import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrandHeader } from "./BrandHeader";
import { useRegister } from "../hooks/useAuth";
import type { RegisterForm as RegisterFormType } from "@/interfaces/forms";

const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El email es requerido").email("Email inválido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const RegistroForm = () => {
  const { t } = useTranslation();
  const { mutate: doRegister, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormType) => {
    doRegister(data);
  };

  return (
    <div className="bg-surface-container-low glass-panel w-full max-w-md p-8 lg:p-12 rounded-xl shadow-2xl shadow-primary/5 border border-hairline">
      <div className="lg:hidden mb-8 space-y-2">
        <h1 className="text-4xl font-headline font-extrabold text-ink tracking-tight">
          {t("auth.register.headline")}
        </h1>
        <p className="font-label text-ink-muted-48">
          {t("auth.register.subtitle")}
        </p>
      </div>
      <div className="space-y-6">
        <BrandHeader />
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-ink-muted-48 ml-1">
              {t("auth.register.nameLabel")}
            </label>
            <div className="relative group">
              <input
                className={`w-full bg-surface-container-low border-none ring-1 ring-hairline focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label text-ink placeholder:text-ink-muted-48 transition-all duration-300 ${
                  errors.name ? "ring-2 ring-destructive" : ""
                }`}
                placeholder={t("auth.register.namePlaceholder")}
                type="text"
                {...register("name")}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-ink-muted-48 group-focus-within:text-primary">
                person
              </span>
            </div>
            {errors.name && (
              <p
                className="text-destructive text-xs font-label ml-1"
                role="alert"
                aria-live="polite"
              >
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-ink-muted-48 ml-1">
              {t("auth.register.emailLabel")}
            </label>
            <div className="relative group">
              <input
                className={`w-full bg-surface-container-low border-none ring-1 ring-hairline focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label text-ink placeholder:text-ink-muted-48 transition-all duration-300 ${
                  errors.email ? "ring-2 ring-destructive" : ""
                }`}
                placeholder={t("auth.register.emailPlaceholder")}
                type="email"
                {...register("email")}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-ink-muted-48 group-focus-within:text-primary">
                mail
              </span>
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
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-ink-muted-48 ml-1">
              {t("auth.register.passwordLabel")}
            </label>
            <div className="relative group">
              <input
                className={`w-full bg-surface-container-low border-none ring-1 ring-hairline focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label text-ink placeholder:text-ink-muted-48 transition-all duration-300 ${
                  errors.password ? "ring-2 ring-destructive" : ""
                }`}
                placeholder={t("auth.register.passwordPlaceholder")}
                type="password"
                {...register("password")}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-ink-muted-48 group-focus-within:text-primary">
                lock
              </span>
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
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-ink-muted-48 ml-1">
              {t("auth.register.confirmPasswordLabel", "Confirmar contraseña")}
            </label>
            <div className="relative group">
              <input
                className={`w-full bg-surface-container-low border-none ring-1 ring-hairline focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label text-ink placeholder:text-ink-muted-48 transition-all duration-300 ${
                  errors.confirmPassword ? "ring-2 ring-destructive" : ""
                }`}
                placeholder={t(
                  "auth.register.confirmPasswordPlaceholder",
                  "Repite tu contraseña",
                )}
                type="password"
                {...register("confirmPassword")}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-ink-muted-48 group-focus-within:text-primary">
                lock_reset
              </span>
            </div>
            {errors.confirmPassword && (
              <p
                className="text-destructive text-xs font-label ml-1"
                role="alert"
                aria-live="polite"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            className="w-full bg-primary-dim text-white font-headline font-bold py-5 rounded-full shadow-lg shadow-primary/20 hover:bg-on-primary-fixed active:scale-95 transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? t("auth.register.creating", "Creando cuenta...")
              : t("auth.register.createAccount")}
          </button>
        </form>
        <p className="text-center font-label text-ink-muted-48 pt-4">
          {t("auth.register.haveAccount")}{" "}
          <Link
            to="/auth/login"
            className="text-surface-tint font-bold hover:underline"
          >
            {t("auth.register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};
