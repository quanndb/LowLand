import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("access_token");
  // console.log(jwtDecode(accessToken));
  if (!accessToken && jwtDecode(accessToken).role != "ADMIN") {
    // localStorage.setItem("accessToken", "quandeptrai");
    return <Navigate to={"/admin/login"} />;
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
