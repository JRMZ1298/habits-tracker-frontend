import { RouterProvider } from "react-router";
import { appRoutes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Reintentar 1 vez si falla
      staleTime: 1000 * 60, // Cache válido por 1 minuto
    },
  },
});

export const HabitsMain = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRoutes} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
