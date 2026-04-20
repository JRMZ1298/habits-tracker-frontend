import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { loginUser, registerUser } from "../../api/habitsAccions";
import { useNavigate } from "react-router";
import type { LoginResponse } from "@/interfaces/api";
import type { LoginForm, RegisterForm } from "@/interfaces/forms";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginForm>({
    mutationFn: ({ email, password }) => loginUser(email, password),

    onSuccess: (data) => {
      // data = { access_token: '...', token_type: 'bearer', user_name: '...' }
      setAuth(data.access_token, { name: data.user_name });
      navigate("/app");
    },

    onError: () => {
      const msg = "Error al iniciar sesión";
      console.error(msg);
      // Aquí puedes mostrar un toast o setear un estado de error
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newUser: RegisterForm) => registerUser(newUser),
    onSuccess: () => navigate("/auth/login"),
    onError: () => {
      console.error("Error al registrar usuario");
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/auth/login");
  };
}
