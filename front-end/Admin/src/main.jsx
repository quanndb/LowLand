import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as StoreProvider } from "react-redux";

import App from "./App.jsx";
import { store } from "./redux/store.jsx";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes/sections.jsx";
import ThemeProvider from "./theme/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DialogProvider } from "./components/dialog/DialogProvider.jsx";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new QueryClient();

root.render(
  <HelmetProvider>
    <Suspense>
      <StoreProvider store={store}>
        <ToastContainer
          autoClose={2000}
          pauseOnHover={false}
          position="bottom-left"
        />
        <QueryClientProvider client={client}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider>
            <RouterProvider router={routes}>
              <DialogProvider>
                <App />
              </DialogProvider>
            </RouterProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </StoreProvider>
    </Suspense>
  </HelmetProvider>
);
