import { Box, Button } from "@mui/material";
import { useState } from "react";

const Explore = ({ show, isHover }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      className={"btn"}
      sx={{
        position: "absolute",
        bottom: "5px",
        width: "100%",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease-in-out",
    }}
    >
      <Button
        sx={{
          padding: "10px",
          width: "90%",
          margin: "10px",
          transition: "all 0.7s ease-in-out ",
          backgroundColor: hovered ? "#ddd" : "white",
          transform: hovered ? "none" : "translateY(-15px)",
          //transform: hovered ? "none" : "translateY(-20px)",
        }}
      >
        EXPLORE OUR OFFICES
      </Button>
    </Box>
  );
};

export default Explore;
