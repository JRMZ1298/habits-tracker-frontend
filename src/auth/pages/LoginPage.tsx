import { BrandHeader } from "@/auth/components/BrandHeader";
import { LoginForm } from "@/auth/components/LoginForm";
import { useSearchParams, Link } from "react-router";
import { X } from "lucide-react";

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const googleError = searchParams.get("error");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-surface relative">
      <Link
        to="/home"
        className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full text-ink-muted-80 hover:text-ink hover:bg-ink/5 transition-colors"
        aria-label="Cerrar y volver al inicio"
      >
        <X className="size-5" />
      </Link>
      <main className="w-full max-w-md">
        <BrandHeader />
        <LoginForm />
        {googleError && (
          <p className="text-sm text-error text-center mb-4">
            No se pudo iniciar sesión con Google. Intenta de nuevo.
          </p>
        )}
        <div className="mt-12 flex justify-center gap-2 opacity-30">
          <div className="w-2 h-2 rounded-full bg-on-background" />
          <div className="w-2 h-2 rounded-full bg-on-primary-fixed" />
          <div className="w-2 h-2 rounded-full bg-on-surface" />
        </div>
      </main>
    </div>
  );
};
