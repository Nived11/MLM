import { Navigate, Route } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import {
  Dashboard,
  Login,
  Network,
  Payment,
  UserManagement,
} from "../pages/admin";

const AdminRoute = () => {
  return (
    <Route path="/admin/*">
      <Route path="login" element={<Login />} /> {/* Suhail */}

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />  {/* Suhail */}
        <Route path="user-management" element={<UserManagement />} /> {/* Justin */}
        <Route path="payment" element={<Payment />} /> {/* Justin */}
        <Route path="network" element={<Network />} /> {/* Justin */}
      </Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      
    </Route>
  );
};

export default AdminRoute;
