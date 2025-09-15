import { Navigate, Route, Routes } from "react-router-dom";
import SidebarRoute from "./SidebarRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoute()}
      {SidebarRoute()}
      {AdminRoute()}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
