import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import News from "../pages/News/News";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";

export const AdminLayout = () => {
  return <Outlet />;
};

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Products />,
    path: "/products",
  },
  {
    element: <News />,
    path: "/news",
  },
  {
    element: <AdminLayout />,
    children: [
      {
        element: <Login />,
        path: "/admin/login",
      },
      {
        element: <ProtectedRoute />,
        children: [{ element: <Dashboard />, path: "/admin/dashboard" },{}],
      },  
    ],
  },
]);

export default router;
