import { BrandHeader } from "@/auth/components/BrandHeader";
import { LoginForm } from "@/auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-surface">
      <main className="w-full max-w-md">
        <BrandHeader />
        <LoginForm />
        <div className="mt-12 flex justify-center gap-2 opacity-30">
          <div className="w-2 h-2 rounded-full bg-on-background" />
          <div className="w-2 h-2 rounded-full bg-on-primary-fixed" />
          <div className="w-2 h-2 rounded-full bg-on-surface" />
        </div>
      </main>
    </div>
  );
};
