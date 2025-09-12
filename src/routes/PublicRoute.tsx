import { Route } from "react-router";
import { ForgotPassword, Login, SignUp } from "../pages";
import PublicLayout from "../layouts/PublicLayout";

const PublicRoute = () => {
  return (
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
  );
};

export default PublicRoute;
