import { EditorialContent } from "../components/EditorialContent";
import { RegistroForm } from "../components/RegistroForm";
import { Link } from "react-router";
import { X } from "lucide-react";

export const RegistroPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-surface">
      {/* Abstract Bio-Shapes Background */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <Link
        to="/home"
        className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full text-ink-muted-80 hover:text-ink hover:bg-ink/5 transition-colors z-20"
        aria-label="Cerrar y volver al inicio"
      >
        <X className="size-5" />
      </Link>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Editorial Content */}
        <EditorialContent />
        {/* Right Side: Registration Form */}
        <div className="flex justify-center lg:justify-end">
          <RegistroForm />
        </div>
      </div>
    </main>
  );
};
