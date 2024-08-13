import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as StoreProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppThemeProvider from "./theme/index.jsx";
import { store } from "./redux/store.jsx";
import routes from "./routes/sections.jsx";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new QueryClient();

root.render(
  <HelmetProvider>
    <AppThemeProvider>
      <StoreProvider store={store}>
        <ToastContainer
          autoClose={2000}
          pauseOnHover={false}
          position="bottom-left"
        />
        <QueryClientProvider client={client}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <RouterProvider router={routes}>
              <App />
            </RouterProvider>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </StoreProvider>
    </AppThemeProvider>
  </HelmetProvider>
);
