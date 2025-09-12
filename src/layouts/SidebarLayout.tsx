import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/common/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import Header from "../components/common/Header";

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden ">
        <AppSidebar />

        <div className="flex flex-col flex-1 min-w-0">
          <Header />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
