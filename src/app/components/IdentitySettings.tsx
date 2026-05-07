import { useTranslation } from "react-i18next";

import { useForm, useController, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  identitySchema,
  type IdentityFormData,
} from "./IdentitySettingsSchema";
import { useAuthStore } from "@/auth/store/authStore";

const IdentityForm = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const DEFAULT_VALUES: IdentityFormData = {
    displayName: user?.name || "None",
    email: user?.email || "None",
  };

  const form = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = (data: IdentityFormData) => {
    console.log("Submitting:", data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="bg-canvas border border-hairline rounded-[18px] p-[32px] md:p-[48px] flex flex-col md:flex-row gap-[32px] items-center md:items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <div className="w-[96px] h-[96px] rounded-full bg-canvas-parchment overflow-hidden">
            <img
              alt="User profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo50_diWeKtoj8lBGyxuyvepoSsltvGqcjnWvcYagTu93y-4RWnuV5KKuHTqkEGpV5N-IXRRvaXMLPLZMq1mx3KPT2tThC7l16rqBPA9hL6WUnSHKjfLC73yu9Q3jPirHz7mOOWKc3PCBviNsVoSJUvUIR7TF48TTEB54kATQqbZAwRglqCfX6zvchNdsqwJYkQAJkMfMD0UoRQJh8bhRm9JrTdiFP2foapd1pHIlxs"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-surface-chip-translucent rounded-full flex items-center justify-center transition-transform active:scale-[0.95]"
          >
            <span className="material-symbols-outlined text-[16px] text-ink">
              edit
            </span>
          </button>
        </div>

        <div className="flex-1 space-y-[24px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[17px]">
            <DisplayNameField />
            <EmailField />
          </div>

          <div className="flex justify-end gap-[8px] pt-[8px]">
            <button
              type="button"
              onClick={() => reset(DEFAULT_VALUES)}
              className="px-[22px] py-[11px] rounded-[9999px] text-[17px] text-primary font-normal leading-[1.47] border border-primary/30 transition-transform active:scale-[0.95]"
            >
              {t("app.settings.advanced.discard")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-[22px] py-[11px] rounded-[9999px] bg-primary text-on-primary text-[17px] font-normal leading-[1.47] transition-transform active:scale-[0.95]"
            >
              {t("app.settings.advanced.saveChanges")}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const DisplayNameField = () => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error },
  } = useController<IdentityFormData, "displayName">({
    name: "displayName",
  });

  return (
    <div className="space-y-[8px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
        {t("app.settings.displayName")}
      </label>
      <input
        type="text"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-hairline focus-visible:border-primary focus-visible:outline-none transition-colors"
      />
      {error && <p className="text-destructive text-[14px]">{error.message}</p>}
    </div>
  );
};

const EmailField = () => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error },
  } = useController<IdentityFormData, "email">({
    name: "email",
  });

  return (
    <div className="space-y-[8px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
        {t("app.settings.emailAddress")}
      </label>
      <input
        type="email"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-hairline focus-visible:border-primary focus-visible:outline-none transition-colors"
      />
      {error && <p className="text-destructive text-[14px]">{error.message}</p>}
    </div>
  );
};

export const IdentitySettings = () => <IdentityForm />;
