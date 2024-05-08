import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken || jwtDecode(accessToken).role != "ADMIN") {
    return <Navigate to={"/"} />;
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
