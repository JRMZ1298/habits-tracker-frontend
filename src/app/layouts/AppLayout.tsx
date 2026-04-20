import { Outlet } from "react-router";
import { MainHeader } from "../components/MainHeader";
import { MainSidebar } from "../components/MainSidebar";

const AppLayout = () => (
  <div className="text-on-background antialiased pb-32 md:pb-0 bg-surface min-h-screen">
    <MainHeader />
    <div className="flex pt-20 md:pt-24">
      <MainSidebar />
      <main className="flex-1 px-6 pt-6 pb-20 md:px-12 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;
