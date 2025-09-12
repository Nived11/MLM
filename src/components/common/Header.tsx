import { IoIosNotifications } from "react-icons/io";
import Logo from "../icons/logo";
import { SidebarCustomTrigger } from "./SidebarCustomTrigger";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <div className="top-0 sticky bg-background z-50 shadow shadow-white/20 items-center grid grid-cols-3 pr-5">
      <SidebarCustomTrigger />
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex justify-end items-center gap-3">
        <IoIosNotifications size={28} />
        <MdAccountCircle size={25} />
      </div>
    </div>
  );
};

export default Header;
