import { EditorialContent } from "../components/EditorialContent";
import { RegistroForm } from "../components/RegistroForm";

export const RegistroPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Bio-Shapes Background */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-container/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none"></div>
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
