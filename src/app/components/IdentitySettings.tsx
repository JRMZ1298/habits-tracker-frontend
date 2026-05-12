import { useTranslation } from "react-i18next";

import { useForm, useController, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  identitySchema,
  type IdentityFormData,
} from "./IdentitySettingsSchema";
import { useAuthStore } from "@/auth/store/authStore";
import { useUpdateProfile } from "../hooks/useProfileUser";

const IdentityForm = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const updateProfile = useUpdateProfile();

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

  const onSubmit = async (data: IdentityFormData) => {
    await updateProfile.mutateAsync({
      name: data.displayName,
      email: data.email,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className="bg-canvas border border-hairline rounded-[18px] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-canvas-parchment overflow-hidden">
            <img
              alt="User profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo50_diWeKtoj8lBGyxuyvepoSsltvGqcjnWvcYagTu93y-4RWnuV5KKuHTqkEGpV5N-IXRRvaXMLPLZMq1mx3KPT2tThC7l16rqBPA9hL6WUnSHKjfLC73yu9Q3jPirHz7mOOWKc3PCBviNsVoSJUvUIR7TF48TTEB54kATQqbZAwRglqCfX6zvchNdsqwJYkQAJkMfMD0UoRQJh8bhRm9JrTdiFP2foapd1pHIlxs"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 bg-surface-chip-translucent rounded-full flex items-center justify-center transition-transform active:scale-[0.95]"
          >
            <span className="material-symbols-outlined text-[16px] text-ink">
              edit
            </span>
          </button>
        </div>

        <div className="flex-1 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.25">
            <DisplayNameField />
            <EmailField />
          </div>

          {/* Error del backend */}
          {updateProfile.isError && (
            <p className="text-destructive text-[14px] text-center">
              "Error al guardar los cambios"
            </p>
          )}

          {/* Éxito */}
          {updateProfile.isSuccess && (
            <p
              className="text-[14px] text-center"
              style={{ color: "hsl(var(--color-primary))" }}
            >
              {t("app.settings.savedSuccessfully")}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => reset(DEFAULT_VALUES)}
              className="px-5.5 py-2.75 rounded-[9999px] text-[17px] text-primary font-normal leading-[1.47] border border-primary/30 transition-transform active:scale-[0.95]"
            >
              {t("app.settings.advanced.discard")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5.5 py-2.75 rounded-[9999px] bg-primary text-on-primary text-[17px] font-normal leading-[1.47] transition-transform active:scale-[0.95] hover:bg-primary-focus"
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
    <div className="space-y-2">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
        {t("app.settings.displayName")}
      </label>
      <input
        type="text"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-md px-4.25 py-2.75 border border-hairline focus-visible:border-primary focus-visible:outline-none transition-colors"
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
    <div className="space-y-2">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px]">
        {t("app.settings.emailAddress")}
      </label>
      <input
        type="email"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className="w-full bg-canvas text-ink text-[17px] leading-[1.47] rounded-md px-4.25 py-2.75 border border-hairline focus-visible:border-primary focus-visible:outline-none transition-colors"
      />
      {error && <p className="text-destructive text-[14px]">{error.message}</p>}
    </div>
  );
};

export const IdentitySettings = () => <IdentityForm />;
