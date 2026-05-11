import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/auth/store/authStore";
import habitsApi from "@/api/habitsApi";
import type {
  UpdateProfileData,
  UpdateProfileResponse,
} from "@/interfaces/api";

export function useUpdateProfile() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<UpdateProfileResponse, Error, UpdateProfileData>({
    mutationFn: (data) =>
      habitsApi.put("/users/me", data).then((res) => res.data),

    onSuccess: (updated) => {
      // Generar nuevo token con el email actualizado
      habitsApi.post("/users/refresh", { email: updated.email }).then((res) => {
        setAuth(res.data.access_token, {
          name: updated.name,
          email: updated.email,
        });
      });
    },
  });
}
