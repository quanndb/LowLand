import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as StoreProvider } from "react-redux";

import App from "./App.jsx";
import AppThemeProvider from "./theme/index.jsx";
import { store } from "./redux/store.jsx";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <AppThemeProvider>
          <StoreProvider store={store}>
            <App />
          </StoreProvider>
        </AppThemeProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
