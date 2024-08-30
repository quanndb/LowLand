import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "src/layouts/dashboard";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { accessToken } from "src/redux/selectors/UserSelector";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = useSelector(accessToken);

  if (
    token &&
    (jwtDecode(token).scope === "ADMIN" ||
      jwtDecode(token).scope === "EMPLOYEE")
  )
    return (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    );
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
