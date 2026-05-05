// src/hooks/useNotifications.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { NotificationPreferences } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

export function useNotificationPreferences() {
  return useQuery<NotificationPreferences>({
    queryKey: ["notification-prefs"],
    queryFn: () =>
      habitsApi.get("/notifications/me/notifications").then((r) => r.data),
  });
}

export function useUpdateNotifications() {
  const queryClient = useQueryClient();

  return useMutation<NotificationPreferences, Error, NotificationPreferences>({
    mutationFn: (prefs) =>
      habitsApi
        .put("/notifications/me/notifications", prefs)
        .then((r) => r.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["notification-prefs"], data);
    },
  });
}
