import { useState } from "react";
import { Outlet } from "react-router";
import { MainHeader } from "../components/MainHeader";
import { MainSidebar } from "../components/MainSidebar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="text-on-background antialiased pb-32 md:pb-0 bg-surface min-h-screen">
      <MainHeader />
      <div className="flex pt-20 md:pt-24">
        <MainSidebar
          isMobileOpen={isSidebarOpen}
          onMobileClose={() => setIsSidebarOpen(false)}
        />
        <main
          id="main-content"
          className="flex-1 px-6 pt-6 pb-20 md:px-12 max-w-7xl mx-auto"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 left-6 z-50 md:hidden bg-primary-dim text-on-dark rounded-full p-4 shadow-lg shadow-primary/20 hover:bg-primary-focus transition-all duration-200 active:scale-95"
        aria-label="Abrir menú de navegación"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
    </div>
  );
};

export default AppLayout;
