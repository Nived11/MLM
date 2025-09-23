import { Route } from "react-router";
import { ForgotPassword, Login, ResetPassword, SignUp } from "../pages/user";
import PublicLayout from "../layouts/PublicLayout";

const PublicRoute = () => {
  return (
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<Login />} /> {/* Shabana */}
      <Route path="/register" element={<SignUp />} /> {/* Shabana */}
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Shabana */}
      <Route path="/reset-password" element={<ResetPassword />} /> {/* Shabana */}
    </Route>
  );
};

export default PublicRoute;
