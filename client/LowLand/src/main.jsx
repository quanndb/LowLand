import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as StoreProvider } from "react-redux";

import AppThemeProvider from "./theme/index.jsx";
import { store } from "./redux/store.jsx";
import routes from "./routes/sections.jsx";
import App from "./App.jsx";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <AppThemeProvider>
      <StoreProvider store={store}>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </StoreProvider>
    </AppThemeProvider>
  </HelmetProvider>
);
