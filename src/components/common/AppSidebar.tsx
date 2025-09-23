import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { sidebarItems, menuLinks } from "../../utils/contant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { deleteLocalStorage } from "../../utils/helpers/localStorage";

export function AppSidebar() {
  const { pathname } = useLocation();
  const { open } = useSidebar();
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    deleteLocalStorage("accessToken");
    deleteLocalStorage("refreshToken");
    navigate("/login");
  };

  const isActive = (path: string): boolean => pathname.includes(path);

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-white/20 shadow shadow-white/30"
    >
      <SidebarContent className="bg-background">
        <SidebarGroup className="h-full">
          <SidebarGroupContent className="h-full flex justify-start text-foreground ">
            <div className="flex flex-col gap-4 w-fit pt-6 pr-[10px]">
              {sidebarItems.map((item) => (
                <TooltipProvider key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {item?.label?.toLowerCase() === "logout" ? (
                        <button
                          className={`flex items-center aspect-square justify-center gap-3 p-2 rounded-full transition-colors duration-200 ${
                            isActive(item.path)
                              ? "bg-white"
                              : "hover:bg-white/10"
                          }`}
                          onClick={() => {
                            logout();
                          }}
                        >
                          <item.icon isActive={isActive(item.path)} />
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={`flex items-center aspect-square justify-center gap-3 p-2 rounded-full transition-colors duration-200 ${
                            isActive(item.path)
                              ? "bg-white"
                              : "hover:bg-white/10"
                          }`}
                        >
                          <item.icon isActive={isActive(item.path)} />
                        </Link>
                      )}
                    </TooltipTrigger>

                    <TooltipContent
                      side="right"
                      className="bg-white text-black"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            {open && (
              <div className="border-l border-white/30 pt-6 space-y-2 w-full pl-2">
                <Accordion type="multiple" className="space-y-2">
                  {menuLinks.map((menu, index) =>
                    menu.links?.length ? (
                      <AccordionItem
                        key={menu.path}
                        className="border-white/20"
                        value={menu.path}
                      >
                        <AccordionTrigger className="px-3 py-2 text-sm rounded-md flex justify-between hover:no-underline items-center ">
                          <span
                            className={
                              isActive(menu.path) ? "font-bold" : "font-normal"
                            }
                          >
                            {menu.label}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 space-y-1 ">
                          {menu.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              className={`block px-3 py-1 text-sm rounded-md ${
                                isActive(link.path) ? "font-bold" : ""
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={menu.path}
                        to={menu.path}
                        className={`block px-3 border-white/30 py-2 text-sm ${
                          index === 4 ? "border-b" : ""
                        } ${isActive(menu.path) ? "font-bold" : ""}`}
                      >
                        {menu.label}
                      </Link>
                    )
                  )}
                </Accordion>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
