import { Navigate, Route } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import {
  Dashboard,
  Login,
  Network,
  Payment,
  Report,
  UserManagement,
} from "../pages/admin";

const AdminRoute = () => {
  return (
    <Route path="/admin/*">
      <Route path="login" element={<Login />} /> {/* Suhail */}

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />  {/* Sharanya */}
        <Route path="user-management" element={<UserManagement />} /> {/* Nived */}
        <Route path="payment" element={<Payment />} /> {/* Abhitha */}
        <Route path="network" element={<Network />} /> {/* Arathi */}
        <Route path="report" element={<Report />} /> {/* Shabana */}
      </Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      
    </Route>
  );
};

export default AdminRoute;
