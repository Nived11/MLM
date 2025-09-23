import { Navigate, Route, Routes } from "react-router-dom";
import SidebarRoute from "./SidebarRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import { useGlobalLoader } from "../hooks/use-loader";
import GlobalLoader from "../components/common/GloabalLoader";

const AppRoutes = () => {
  const { user, showLoader } = useGlobalLoader();

  if (showLoader) return <GlobalLoader />;

  return (
    <Routes>
      {PublicRoute()}
      {SidebarRoute(!!user)}
      {AdminRoute(user?.user_id === "adm")}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
