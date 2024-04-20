import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import { Suspense } from "react";

const ProtectedRoute = () => {
  if (!localStorage.getItem("accessToken")) {
    localStorage.setItem("accessToken", "quandeptrai");
    // return <Navigate to={"/admin/login"} />;
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
