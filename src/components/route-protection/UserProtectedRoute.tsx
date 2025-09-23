import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isUser: boolean;
};

const UserProtectedRoute = ({ isUser }: Props) => {
  return isUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute
