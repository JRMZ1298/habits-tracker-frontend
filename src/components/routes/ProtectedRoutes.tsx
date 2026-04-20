// import { useAuthStore } from "@/auth/store/auth.store"
import { useAuthStore } from "@/auth/store/authStore";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/app" />;

  return children;
};

// export const AdminRoute = ({ children }: PropsWithChildren) => {
//     const { authStatus, isAdmin } = useAuthStore();

//     if (authStatus === 'checking') return null;

//     if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />

//     if (!isAdmin()) return <Navigate to='/' />

//     return children
// }
