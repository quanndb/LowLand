import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";
import Loading from "src/components/Loading";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return <Navigate to={"/"} />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default ProtectedRoute;
