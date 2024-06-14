import { Suspense, lazy } from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";

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
const CheckoutPage = lazy(() => import("src/pages/checkout"));
const DefaultLayout = lazy(() => import("src/layouts/defaultLayout"));
const SignUpPage = lazy(() => import("src/pages/signUp"));
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
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signUp",
    element: (
      <Suspense fallback={<Loading />}>
        <SignUpPage />
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
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <Navigate to="/404" replace />
      </Suspense>
    ),
  },
]);

export default routes;
