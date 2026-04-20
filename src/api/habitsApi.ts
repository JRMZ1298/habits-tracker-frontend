import axios from "axios";
import { useAuthStore } from "../auth/store/authStore";

// Instancia base apuntando a tu FastAPI
const habitsApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Interceptor de REQUEST
// Se ejecuta ANTES de cada petición y agrega el token automáticamente
habitsApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // Leer sin hook (fuera de React)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPONSE
// Se ejecuta cuando llega la respuesta — maneja el 401 globalmente
habitsApi.interceptors.response.use(
  (response) => response, // Si va bien, devuelve normal

  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido — logout automático
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default habitsApi;
