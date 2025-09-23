import { adminLinks } from "../../utils/contant";
import Logo from "../icons/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { deleteLocalStorage } from "../../utils/helpers/localStorage";

const AdminHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    deleteLocalStorage("accessToken");
    deleteLocalStorage("refreshToken");
    navigate("/admin/login");
  };

  const NavLinks = () => (
    <ul className="space-y-2 md:space-y-0">
      {adminLinks.map(({ id, icon: Icon, label, path }) => {
        if (label.toLowerCase() === "logout") {
          return (
            <li key={id}>
              <button
                onClick={() => {
                  logout();
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-md md:rounded-none md:px-6 md:py-4 text-sm transition-colors
              ${location.pathname === path ? "bg-white text-background" : ""}`}
              >
                <Icon size={18} />
                {label}
              </button>
            </li>
          );
        }
        return (
          <li key={id}>
            <Link
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md md:rounded-none md:px-6 md:py-4 text-sm transition-colors
              ${location.pathname === path ? "bg-white text-background" : ""}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <header className="flex items-center justify-between px-4 py-1 border-b lg:hidden bg-gradient-to-tl from-blue-2 to-blue-1 border-white/20 sticky top-0">
        <Logo />
        <div className="flex items-center gap-2 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button>
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-4 bg-gradient-to-tl from-blue-2 to-blue-1"
            >
              <SheetHeader>
                <Logo />
              </SheetHeader>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <aside className="hidden lg:flex w-64 h-screen shadow-md flex-col px-4 pt-4">
        <div className="mb-3">
          <Logo />
        </div>
        <nav className="flex-1 overflow-hidden bg-gradient-to-tl from-blue-2 to-blue-1 rounded-t-xl">
          <NavLinks />
        </nav>
      </aside>
    </>
  );
};

export default AdminHeader;
