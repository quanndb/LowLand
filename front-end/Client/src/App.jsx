import "./global.css";
import accessAPI from "./services/API/accessAPI";
import { useEffect } from "react";

export default function App({ children }) {
  useEffect(() => {
    accessAPI.post();
  }, []);

  return <>{children}</>;
}
