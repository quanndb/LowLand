import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

export const IndexPage = lazy(() => import("../pages/app"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const Home = lazy(() => import("../pages/Home/Home"));
export const News = lazy(() => import("../pages/News/News"));
export const Products = lazy(() => import("../pages/Products/Products"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <Outlet />,
      path: "admin",
      children: [
        { path: "login", element: <LoginPage /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "dashboard", element: <IndexPage /> },
            { path: "user", element: <UserPage /> },
            { path: "products", element: <ProductsPage /> },
            { path: "blog", element: <BlogPage /> },
          ],
        },
      ],
    },
    {
      element: <Home />,
      path: "/",
      index: true,
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
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
