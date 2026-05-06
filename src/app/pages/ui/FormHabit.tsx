import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import {
  useForm,
  useController,
  useFieldArray,
  FormProvider,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { habitSchema, type HabitFormData } from "./FormHabitSchema";

import {
  useCreateHabit,
  useHabit,
  useUpdateHabit,
} from "@/app/hooks/useHabits";
import { getHabit } from "@/api/habitsAccions";

import { HabitHeader } from "./components/HabitHeaderForm";
import { ReminderPanel } from "./components/ReminderPanelForm";
import { ICONS } from "./components/VisualSelectorForm";

const useHabitForm = (habitId: number | undefined) => {
  const isEditing = !!habitId;
  const { isLoading } = useHabit(habitId);
  const createHabit = useCreateHabit();
  const updateHabit = useUpdateHabit(habitId ?? 0);
  const mutation = isEditing ? updateHabit : createHabit;

  const form = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    mode: "onTouched",
    defaultValues: async () => {
      if (!isEditing || !habitId) {
        return {
          name: "",
          frequency: "daily" as const,
          goal: "30 minutos",
          category: "favorite",
          reminders: [{ value: "07:00" }],
        };
      }

      const habit = await getHabit(habitId);

      return {
        name: habit.name,
        frequency: habit.frequency as "daily" | "weekly",
        goal: habit.goal ?? "30 minutos",
        category: habit.icon ?? "spa",
        reminders:
          habit.reminders?.map((r: string) => ({
            value: r,
          })) || [{ value: "07:00" }],
      };
    },
    reValidateMode: "onBlur",
  });

  return { form, isEditing, isLoading, mutation };
};

const NameField = () => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error },
  } = useController<HabitFormData, "name">({
    name: "name",
  });

  return (
    <section className="bg-canvas border border-hairline rounded-[18px] p-8">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-3 block">
        {t("formHabit.habitIdentity")}
      </label>

       <input
         value={field.value}
         onChange={field.onChange}
         onBlur={field.onBlur}
         className="w-full bg-transparent text-[28px] font-semibold text-ink leading-[1.14] placeholder:text-ink-muted-48 focus-visible:outline-none"
         style={{ letterSpacing: "0.196px" }}
         placeholder={t("formHabit.habitPlaceholder")}
       />

      {error && (
        <p className="text-destructive mt-2 text-[14px]">{error.message}</p>
      )}
    </section>
  );
};

export const FormHabit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { idHabit } = useParams<{
    idHabit?: string;
  }>();

  const habitId = idHabit ? parseInt(idHabit) : undefined;

  const { form, isEditing, isLoading, mutation } = useHabitForm(habitId);

  const { control, handleSubmit, formState } = form;
  const { isValid } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reminders",
  });

  const onSubmit = useCallback(
    async (data: HabitFormData) => {
      await mutation.mutateAsync({
        name: data.name.trim(),
        frequency: data.frequency,
        goal: data.goal,
        category: data.category,
        reminders: data.reminders,
      });

      navigate("/app/habits");
    },
    [mutation, navigate],
  );

  if (isEditing && isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-16 bg-canvas-parchment rounded-[18px]" />
        <div className="h-50 bg-canvas-parchment rounded-[18px]" />
        <div className="h-50 bg-canvas-parchment rounded-[18px]" />
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form className="w-full max-w-245" onSubmit={handleSubmit(onSubmit)}>
        <HabitHeader isEditing={isEditing} />

        <div className="space-y-6">
          <NameField />

          <div className="grid md:grid-cols-2 gap-5">
            <FrequencyField />
            <GoalField />
          </div>

          <section className="bg-canvas border border-hairline rounded-[18px] p-8">
            <ReminderPanel
              reminders={fields.map((item) => item.value)}
              onAdd={(time) =>
                append({
                  value: time,
                })
              }
              onRemove={(index) => remove(index)}
            />
          </section>

          <section className="bg-canvas border border-hairline rounded-[18px] p-8">
            <CategoryField />
          </section>

           <div className="flex justify-end gap-2 pt-2">
             <button
               type="button"
               onClick={() => navigate(-1)}
               className="px-5.5 py-2.75 rounded-[9999px] text-[17px] text-primary font-normal leading-[1.47] border border-primary/30 transition-transform active:scale-[0.95]"
             >
               {t("formHabit.cancel")}
             </button>
              <button
                type="submit"
                disabled={mutation.isPending || formState.isSubmitting || !isValid}
                aria-label={isEditing ? t("formHabit.saveChanges") : t("formHabit.cultivateHabit")}
                className="px-5.5 py-2.75 rounded-[9999px] bg-primary text-on-primary text-[17px] font-normal leading-[1.47] transition-transform active:scale-[0.95] flex items-center gap-2 disabled:opacity-50"
              >
               <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                 {mutation.isPending
                   ? "hourglass_empty"
                   : isEditing
                     ? "save"
                     : "check"}
               </span>
               <span>
                 {mutation.isPending
                   ? t("formHabit.saving")
                   : isEditing
                     ? t("formHabit.saveChanges")
                     : t("formHabit.cultivateHabit")}
               </span>
             </button>
           </div>

           {mutation.isError && (
             <p className="text-destructive text-center text-[17px]" role="alert" aria-live="polite">
               {t("formHabit.error")}
             </p>
           )}
        </div>
      </form>
    </FormProvider>
  );
};

const FrequencyField = () => {
  const { t } = useTranslation();
  const { field } = useController<HabitFormData, "frequency">({
    name: "frequency",
  });

  return (
    <section className="bg-canvas border border-hairline rounded-[18px] p-[24px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[12px] block">
        {t("formHabit.rhythm")}
      </label>
      <div className="flex p-[4px] bg-canvas-parchment rounded-[11px]">
        {[
          { label: t("formHabit.daily"), value: "daily" as const },
          { label: t("formHabit.weekly"), value: "weekly" as const },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => field.onChange(option.value)}
            className={`flex-1 py-[8px] rounded-[8px] text-[14px] tracking-[-0.224px] transition-all
              ${
                field.value === option.value
                  ? "bg-canvas text-ink shadow-sm font-normal"
                  : "text-ink-muted-48"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
};

const GoalField = () => {
  const { t } = useTranslation();
  const { field } = useController<HabitFormData, "goal">({
    name: "goal",
  });

  return (
    <section className="bg-canvas border border-hairline rounded-[18px] p-[24px]">
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[12px] block">
        {t("formHabit.goalLabel")}
      </label>
       <input
         className="w-full bg-canvas-parchment text-[17px] text-ink leading-[1.47] rounded-[11px] px-[17px] py-[11px] border border-transparent focus-visible:border-primary focus-visible:outline-none transition-colors"
         type="text"
         value={field.value}
         onChange={field.onChange}
         onBlur={field.onBlur}
       />
    </section>
  );
};

const CategoryField = () => {
  const { t } = useTranslation();
  const { field } = useController<HabitFormData, "category">({
    name: "category",
  });

  return (
    <div>
      <label className="text-[12px] text-ink-muted-48 tracking-[-0.12px] mb-[17px] block">
        {t("formHabit.visualSpirit")}
      </label>
      <div className="grid grid-cols-4 gap-[12px]">
        {ICONS.map((icon) => {
          const isActive = field.value === icon.value;
          return (
            <button
              key={icon.value}
              type="button"
              onClick={() => field.onChange(icon.value)}
              aria-label={`${t("formHabit.visualSpirit")}: ${icon.value}`}
              className={`aspect-square rounded-[18px] flex items-center justify-center transition-all border
                ${
                  isActive
                    ? "bg-ink border-ink"
                    : "bg-canvas-parchment border-hairline hover:border-ink-muted-48"
                }`}
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{
                  color: isActive ? "#ffffff" : "#1d1d1f",
                  fontVariationSettings: `'FILL' ${isActive ? 1 : 0}`,
                }}
              >
                {icon.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
