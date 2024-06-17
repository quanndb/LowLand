import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { user } from "src/redux/selectors/UserSelector";

const ProtectedRoute = () => {
  const userDetails = useSelector(user);
  if (!userDetails) {
    return <Navigate to={"login"} replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
