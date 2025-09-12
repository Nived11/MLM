import { Navigate, Route, Routes } from "react-router-dom";
import SidebarRoute from "./SidebarRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoute()}
      {SidebarRoute()}
      <Route path="*" element={<Navigate to='/dashboard' />} />
    </Routes>
  );
};

export default AppRoutes;
