import { LoginPage } from "@/auth/pages/LoginPage";
import { RegistroPage } from "@/auth/pages/RegistroPage";
import { HomePage } from "@/landingPage/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const appRoutes = createBrowserRouter([
  {
    index: true,
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registro",
    element: <RegistroPage />,
  },
]);
