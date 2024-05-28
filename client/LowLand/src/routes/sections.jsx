import { Suspense, lazy } from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loading from "src/components/Loading";
import { fetchBlogById } from "./loaders/blogLoader";
import { fetchProductById } from "./loaders/productLoader";

import DetailProductPage from "src/pages/detaill-product";
import UserPage from "src/pages/UserPage";

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const HomePage = lazy(() => import("src/pages/home"));
const BlogsPage = lazy(() => import("src/pages/blogs"));
const ContactPage = lazy(() => import("src/pages/contact"));
const AboutPage = lazy(() => import("src/pages/about"));
const ProductsPage = lazy(() => import("src/pages/products"));
const LoginPage = lazy(() => import("src/pages/login"));
const NotFound = lazy(() => import("src/pages/not-found"));
const DetailBlogPage = lazy(() => import("src/pages/detail-blog"));
const DefaultLayout = lazy(() => import("src/layouts/defaultLayout"));

const routes = createBrowserRouter([
  {
    element: (
      <DefaultLayout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </DefaultLayout>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:productID",
        element: <DetailProductPage />,
        loader: fetchProductById,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "blogs/:blogID",
        element: <DetailBlogPage />,
        loader: fetchBlogById,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "user",
    element: <UserPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default routes;
