import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { SocialLoginButton } from "./SocialLoginButton";
import { BrandHeader } from "./BrandHeader";

export const RegistroForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt:", { name, email, password });
  };

  return (
    <div className="bg-surface-container-lowest glass-panel w-full max-w-md p-8 lg:p-12 rounded-xl shadow-2xl shadow-primary/5">
      <div className="lg:hidden mb-8 space-y-2">
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
          {t("auth.register.headline")}
        </h1>
        <p className="font-label text-on-surface-variant">
          {t("auth.register.subtitle")}
        </p>
      </div>
      <div className="space-y-6">
        <BrandHeader />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-on-surface-variant ml-1">
              {t("auth.register.nameLabel")}
            </label>
            <div className="relative group">
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label transition-all duration-300"
                placeholder={t("auth.register.namePlaceholder")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-outline-variant group-focus-within:text-primary">
                person
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-on-surface-variant ml-1">
              {t("auth.register.emailLabel")}
            </label>
            <div className="relative group">
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label transition-all duration-300"
                placeholder={t("auth.register.emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-outline-variant group-focus-within:text-primary">
                mail
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-label text-sm font-bold text-on-surface-variant ml-1">
              {t("auth.register.passwordLabel")}
            </label>
            <div className="relative group">
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 font-label transition-all duration-300"
                placeholder={t("auth.register.passwordPlaceholder")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-outline-variant group-focus-within:text-primary">
                lock
              </span>
            </div>
          </div>
          <button
            className="w-full bg-primary-dim text-white font-headline font-bold py-5 rounded-full shadow-lg shadow-primary/20 hover:bg-on-primary-fixed active:scale-95 transition-all duration-200 mt-4"
            type="submit"
          >
            {t("auth.register.createAccount")}
          </button>
        </form>
        <div className="relative flex items-center py-2">
          <div className="grow border-t border-outline-variant/20"></div>
          <span className="shrink mx-4 text-on-surface-variant text-xs font-label uppercase tracking-widest">
            {t("auth.register.orContinue")}
          </span>
          <div className="grow border-t border-outline-variant/20"></div>
        </div>
        <SocialLoginButton text={t("auth.register.signupGoogle")} />
        <p className="text-center font-label text-on-surface-variant pt-4">
          {t("auth.register.haveAccount")}{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            {t("auth.register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};
