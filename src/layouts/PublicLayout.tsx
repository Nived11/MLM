import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <main className="overflow-y-scroll h-screen">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
