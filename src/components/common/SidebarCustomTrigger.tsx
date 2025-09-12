import { useSidebar } from "../ui/sidebar";
import Menu from "../icons/Menu";

export function SidebarCustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="rounded-full p-3">
      <Menu />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}
