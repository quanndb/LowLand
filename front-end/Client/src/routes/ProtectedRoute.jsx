import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { user } from "src/redux/selectors/UserSelector";
import { useRouter } from "./hooks";

const ProtectedRoute = () => {
  const router = useRouter();
  const userDetails = useSelector(user);

  useEffect(() => {
    if (!userDetails) {
      router.replace("/login");
    }
  }, [userDetails]);

  return userDetails ? <Outlet /> : null;
};

export default ProtectedRoute;
