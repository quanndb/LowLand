import "./global.css";

import { useScrollToTop } from "./hooks/use-scroll-to-top";

// ----------------------------------------------------------------------

export default function App({ children }) {
  useScrollToTop();

  return <>{children}</>;
}
