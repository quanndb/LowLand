import { lazy } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

export const Home = lazy(() => import("src/pages/home"));
export const NotFound = lazy(() => import("src/pages/not-found"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <Outlet />,
      path: "user",
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            // { path: "dashboard", element: <IndexPage /> },
            // { path: "user", element: <UserPage /> },
            // { path: "products", element: <ProductsPage /> },
            // { path: "blog", element: <BlogPage /> },
          ],
        },
      ],
    },
    {
      element: <Home />,
      path: "/",
      index: true,
    },
    // {
    //   path: "login",
    //   element: <LoginPage />,
    // },
    {
      path: "404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
