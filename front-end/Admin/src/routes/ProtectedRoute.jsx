import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "src/layouts/dashboard";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { accessToken } from "src/redux/selectors/UserSelector";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const token = useSelector(accessToken);

  if (token != null) {
    if (jwtDecode(token).scope !== "ADMIN") {
      toast.error("You are not able to login with this account");
      return <Navigate to="login" replace />;
    }
  } else {
    return <Navigate to="login" replace />;
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
