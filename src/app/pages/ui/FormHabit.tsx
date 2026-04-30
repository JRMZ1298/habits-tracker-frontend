import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useForm, Controller, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { habitSchema, type HabitFormData } from "./FormHabitSchema";

import {
  useCreateHabit,
  useHabit,
  useUpdateHabit,
} from "@/app/hooks/useHabits";

import { HabitHeader } from "./components/HabitHeaderForm";
import { RhythmSelector } from "./components/RhythmSelectorForm";
import { GoalInput } from "./components/GoalInputForm";
import { ReminderPanel } from "./components/ReminderPanelForm";
import { VisualSelector } from "./components/VisualSelectorForm";

export const FormHabit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { idHabit } = useParams<{
    idHabit?: string;
  }>();

  const habitId = idHabit ? parseInt(idHabit) : undefined;

  const isEditing = !!habitId;

  const { data: existingHabit, isLoading } = useHabit(habitId);

  const createHabit = useCreateHabit();
  const updateHabit = useUpdateHabit(habitId ?? 0);

  const mutation = isEditing ? updateHabit : createHabit;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),

    defaultValues: {
      name: "",
      frequency: "daily",
      goal: "30 minutos",
      category: "favorite",
      reminders: [{ value: "07:00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reminders",
  });

  useEffect(() => {
    if (!existingHabit) return;

    reset({
      name: existingHabit.name,
      frequency: existingHabit.frequency,
      goal: existingHabit.goal ?? "30 minutos",
      category: existingHabit.icon ?? "spa",

      reminders:
        existingHabit.reminders?.map((r: string) => ({
          value: r,
        })) || [],
    });
  }, [existingHabit, reset]);

  const onSubmit = async (data: HabitFormData) => {
    await mutation.mutateAsync({
      name: data.name.trim(),
      frequency: data.frequency,
      goal: data.goal,
      category: data.category,
      reminders: data.reminders.map((r) => r.value),
    });

    navigate("/app/habits");
  };

  if (isEditing && isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-16 rounded bg-surface-container-low" />
        <div className="h-40 rounded bg-surface-container-low" />
        <div className="h-40 rounded bg-surface-container-low" />
      </div>
    );
  }

  return (
    <form className="w-full max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      <HabitHeader isEditing={isEditing} />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-surface-container-lowest rounded-lg p-8 shadow-sm">
            <label className="block text-sm font-bold text-on-background tracking-widest uppercase mb-4 font-label">
              {t("formHabit.habitIdentity")}
            </label>

            <input
              {...register("name")}
              className="w-full bg-transparent border-b-2 border-surface-container-high focus:border-on-background border-t-0 border-x-0 px-0 py-4 text-2xl font-bold placeholder:text-surface-variant focus:ring-0 transition-all outline-none"
              placeholder={t("formHabit.habitPlaceholder")}
            />

            {errors.name && (
              <p className="text-error mt-2">{errors.name.message}</p>
            )}
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              control={control}
              name="frequency"
              render={({ field }) => (
                <RhythmSelector
                  rhythm={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="goal"
              render={({ field }) => (
                <GoalInput goal={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <ReminderPanel
            reminders={fields.map((item) => item.value)}
            onAdd={(time) =>
              append({
                value: time,
              })
            }
            onRemove={(index) => remove(index)}
          />
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <VisualSelector
                selected={field.value}
                onSelect={field.onChange}
              />
            )}
          />
          <div className="relative rounded-lg overflow-hidden h-64 group">
            <img
              alt={t("formHabit.habitPlaceholder")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLbBU9p9rHOiJbQfIQXXC1poEJ52R5ZSJHymPUQDyCyGXPk2zlYAHn7A15M7b7uFstBaLTVXyNXvVSqxnAtMlypZN0gqnVeZJIge8MlFUvQZt6a0mEcPT61Xe_VFz0A9Bh5kOK0JKGAD5D9XzjF_ZERQmp8mGOx80aujXGJI1nUkQ873XcxVpK2b-IvHndWBw7-M03cwzI7O866QJjDld9XHjMyAJk4VchJWT__aZlClTx_axZ3p5CdlMYy54kbPR1a81PnsBiMXI"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent flex items-end p-6">
              <p className="text-on-primary font-bold italic text-lg leading-tight">
                {t("formHabit.quote")}
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting}
            className="w-full bg-on-background text-on-primary py-6 rounded-full text-xl font-black shadow-xl shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-3 hover:opacity-90"
          >
            <span className="material-symbols-outlined">
              {mutation.isPending
                ? "hourglass_empty"
                : isEditing
                  ? "save"
                  : "celebration"}
            </span>

            <span>
              {mutation.isPending
                ? t("formHabit.saving")
                : isEditing
                  ? t("formHabit.saveChanges")
                  : t("formHabit.cultivateHabit")}
            </span>
          </button>

          {mutation.isError && (
            <p className="text-error text-center">{t("formHabit.error")}</p>
          )}
        </div>
      </div>
    </form>
  );
};
