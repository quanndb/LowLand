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

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <Suspense>
      <StoreProvider store={store}>
        <ToastContainer
          autoClose={2000}
          pauseOnHover={false}
          position="bottom-left"
        />
        <ThemeProvider>
          <RouterProvider router={routes}>
            <App />
          </RouterProvider>
        </ThemeProvider>
      </StoreProvider>
    </Suspense>
  </HelmetProvider>
);
