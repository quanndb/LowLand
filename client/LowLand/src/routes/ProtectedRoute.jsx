import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "src/layouts/dashboard";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken || jwtDecode(accessToken).role != "ADMIN") {
    return <Navigate to={"/404"} />;
  }
  return (
    <DashboardLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

export default ProtectedRoute;
