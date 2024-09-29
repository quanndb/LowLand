import "./global.css";
import accessAPI from "./services/API/accessAPI";
import { useEffect } from "react";

export default function App({ children }) {
  useEffect(() => {
    if (window.location.pathname !== "/404") accessAPI.post();
  }, []);

  return <>{children}</>;
}
