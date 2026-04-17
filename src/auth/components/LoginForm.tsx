import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SocialLoginButton } from "./SocialLoginButton";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="rounded-xl p-8 md:p-10 shadow-sm border border-outline-variant/10 bg-white/70 backdrop-blur-xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-on-surface tracking-tight">
          {t("auth.login.welcome")}
        </h2>
        <p className="text-on-surface-variant font-label mt-2">
          {t("auth.login.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-bold text-on-surface-variant font-label ml-1"
          >
            {t("auth.login.emailLabel")}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
              mail
            </span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-fixed transition-all font-body"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-on-surface-variant font-label"
            >
              {t("auth.login.passwordLabel")}
            </label>
            <a
              href="#"
              className="text-xs font-bold text-primary hover:text-primary-dim transition-colors font-label"
            >
              {t("auth.login.forgotPassword")}
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
              lock
            </span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-fixed transition-all font-body"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary-dim text-white font-bold rounded-full hover:bg-on-primary-fixed transition-all active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
        >
          <span>{t("auth.login.loginButton")}</span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
      </form>

      <div className="relative my-8">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/20"></div>
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-white/0 px-4 text-on-surface-variant font-label">
            {t("auth.login.continueWith")}
          </span>
        </div>
      </div>

      <SocialLoginButton />

      <div className="mt-10 text-center">
        <p className="text-on-surface-variant font-label text-sm">
          {t("auth.login.noAccount")}{" "}
          <a
            href="#"
            className="text-primary font-bold hover:underline transition-all"
          >
            {t("auth.login.signUp")}
          </a>
        </p>
      </div>
    </div>
  );
};
