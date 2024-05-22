import { Suspense, lazy } from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loading from "src/components/Loading";
import { fetchBlogById } from "./loaders/blogLoader";

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
          <ToastContainer
            autoClose={2000}
            pauseOnHover={false}
            position="top-center"
          />
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
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "404",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default routes;
