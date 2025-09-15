import { Outlet } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex w-full h-screen flex-col md:flex-row">
      <AdminHeader />
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
