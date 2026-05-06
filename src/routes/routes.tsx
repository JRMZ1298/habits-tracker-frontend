import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from "@/components/routes/ProtectedRoutes";

const LoginPage = lazy(() => import("@/auth/pages/LoginPage").then(module => ({ default: module.LoginPage })));
const RegistroPage = lazy(() => import("@/auth/pages/RegistroPage").then(module => ({ default: module.RegistroPage })));
const HomePage = lazy(() => import("@/landingPage/pages/HomePage").then(module => ({ default: module.HomePage })));
const MetricsPage = lazy(() => import("@/app/pages/MetricsPage").then(module => ({ default: module.MetricsPage })));
const DashboardPage = lazy(() => import("@/app/pages/DashboardPage").then(module => ({ default: module.DashboardPage })));
const HabitsPage = lazy(() => import("@/app/pages/HabitsPage").then(module => ({ default: module.HabitsPage })));
const SettingsPage = lazy(() => import("@/app/pages/SettingsPage").then(module => ({ default: module.SettingsPage })));
const HabitAdminPage = lazy(() => import("@/app/pages/HabitAdminPage").then(module => ({ default: module.HabitAdminPage })));
const BadgesGalleryPage = lazy(() => import("@/app/pages/BadgesGalleryPage").then(module => ({ default: module.BadgesGalleryPage })));
const AppLayout = lazy(() => import("@/app/layouts/AppLayout").then(module => ({ default: module.default })));
const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout").then(module => ({ default: module.default })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-canvas">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/20 animate-bounce" />
      <p className="text-ink-muted-48 text-sm">Cargando...</p>
    </div>
  </div>
);

export const appRoutes = createBrowserRouter([
  //Main Routes
  {
    path: "/home",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  //Not-Autenticated Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AuthLayout />
        </Suspense>
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "registro",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegistroPage />
          </Suspense>
        ),
      },
    ],
  },
  //Autenticated Routes
  {
    path: "/app",
    element: (
      <AuthenticatedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AppLayout />
        </Suspense>
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "metrics",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MetricsPage />
          </Suspense>
        ),
      },
      {
        path: "habits",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HabitsPage />
          </Suspense>
        ),
      },
      {
        path: "habits/new",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HabitAdminPage />
          </Suspense>
        ),
      },
      {
        path: "habits/edit/:idHabit",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HabitAdminPage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "badges",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BadgesGalleryPage />
          </Suspense>
        ),
      },
    ],
  },
  //
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);
