import { LoginPage } from "@/auth/pages/LoginPage";
import { RegistroPage } from "@/auth/pages/RegistroPage";
import { HomePage } from "@/landingPage/pages/HomePage";
import { MetricsPage } from "@/app/pages/MetricsPage";
import { DashboardPage } from "@/app/pages/DashboardPage";
import { HabitsPage } from "@/app/pages/HabitsPage";
import { SettingsPage } from "@/app/pages/SettingsPage";
import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "@/app/layouts/AppLayout";
import { HabitAdminPage } from "@/app/pages/HabitAdminPage";
import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from "@/components/routes/ProtectedRoutes";
import AuthLayout from "@/auth/layouts/AuthLayout";
import { BadgesGalleryPage } from "@/app/pages/BadgesGalleryPage";

export const appRoutes = createBrowserRouter([
  //Main Routes
  {
    path: "/home",
    element: <HomePage />,
  },
  //Not-Autenticated Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegistroPage />,
      },
    ],
  },
  //Autenticated Routes
  {
    path: "/app",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "metrics",
        element: <MetricsPage />,
      },
      {
        path: "habits",
        element: <HabitsPage />,
      },
      {
        path: "habits/new",
        element: <HabitAdminPage />,
      },
      {
        path: "habits/edit/:idHabit",
        element: <HabitAdminPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "badges",
        element: <BadgesGalleryPage />,
      },
    ],
  },
  //
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);
