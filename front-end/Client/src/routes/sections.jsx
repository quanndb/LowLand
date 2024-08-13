import { Suspense, lazy } from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";

import Loading from "src/components/Loading";
import { fetchBlogById } from "./loaders/blogLoader";

import DefaultLayout from "src/layouts/defaultLayout";

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const HomePage = lazy(() => import("src/pages/Home"));
const BlogsPage = lazy(() => import("src/pages/Blogs"));
const ContactPage = lazy(() => import("src/pages/Contact"));
const AboutPage = lazy(() => import("src/pages/About"));
const ProductsPage = lazy(() => import("src/pages/Products"));
const LoginPage = lazy(() => import("src/pages/Login"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const DetailProductPage = lazy(() => import("src/pages/DetailProduct"));
const DetailBlogPage = lazy(() => import("src/pages/DetailBlog"));
const CheckoutPage = lazy(() => import("src/pages/Checkout"));
const SignUpPage = lazy(() => import("src/pages/SignUp"));
const UserPage = lazy(() => import("src/pages/UserPage"));
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
        path: "products/:productId",
        element: <DetailProductPage />,
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
      <Suspense fallback={<Loading />}>
        <ProtectedRoute />
      </Suspense>
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
