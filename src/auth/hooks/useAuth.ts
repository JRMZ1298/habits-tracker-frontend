import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { loginUser, registerUser } from "../../api/habitsAccions";
import { useNavigate } from "react-router";
import type { LoginResponse } from "@/interfaces/api";
import type { LoginForm, RegisterForm } from "@/interfaces/forms";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginForm>({
    mutationFn: ({ email, password }) => loginUser(email, password),

    onSuccess: (data) => {
      queryClient.clear();
      setAuth(data.access_token, {
        name: data.user_name,
        email: data.user_email,
      });
      toast.success("¡Sesión iniciada correctamente!");
      navigate("/app");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ detail?: string }>;
      const message =
        axiosError.response?.data?.detail ||
        "Correo y/o contraseña incorrectos";
      toast.error(message);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newUser: RegisterForm) => registerUser(newUser),
    onSuccess: () => {
      toast.success("¡Registro exitoso! Ahora puedes iniciar sesión");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "Error al registrar usuario");
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    toast.info("Has cerrado sesión");
    navigate("/auth/login");
  };
}
