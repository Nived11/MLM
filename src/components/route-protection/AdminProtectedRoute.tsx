import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAdmin: boolean;
};

const AdminProtectedRoute = ({ isAdmin }: Props) => {
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute
