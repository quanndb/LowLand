import { useState, useEffect } from "react";

const useGetResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial window width
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures this effect runs only on mount and unmount
  return [windowWidth, setWindowWidth];
};

export default useGetResize;
