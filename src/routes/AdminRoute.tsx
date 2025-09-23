import { Navigate, Route } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import {
  Dashboard,
  Login,
  Network,
  Payment,
  UserManagement,
} from "../pages/admin";
import AdminProtectedRoute from "../components/route-protection/AdminProtectedRoute";

const AdminRoute = (isAdmin: boolean) => {
  return (
    <Route path="/admin/*">
      <Route path="login" element={<Login />} /> {/* Suhail */}

      <Route element={<AdminProtectedRoute isAdmin={isAdmin} />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} /> {/* Suhail */}
          <Route path="user-management" element={<UserManagement />} />{" "}
          {/* Justin */}
          <Route path="payment" element={<Payment />} /> {/* Justin */}
          <Route path="network" element={<Network />} /> {/* Justin */}
        </Route>
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Route>
      
    </Route>
  );
};

export default AdminRoute;
