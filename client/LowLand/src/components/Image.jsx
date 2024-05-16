import { Box, Button } from "@mui/material";
import { useState } from "react";

const Overlay = ({ hovered, overlayContent }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: `${hovered ? "rgba(0, 0, 0, 0.2)" : "transparent"}`,
        position: "relative",
        transition: "all 0.5s ease",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "white",
            height: "fit-content",
            width: "90%",
            left: "50%",
            opacity: `${hovered ? 1 : 0}`,
            bottom: `${hovered ? "18px" : "0px"}`,
            transform: "translateX(-50%)",
            position: "absolute",
            transition: "all 0.5s ease",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          {overlayContent ? overlayContent : "EXPLORE MUGS"}
        </Button>
      </Box>
    </Box>
  );
};

const Image = ({ sx, imageURL, unShowOverlay, overlayContent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${imageURL})`,
        ...sx,
      }}
    >
      {unShowOverlay ? (
        <></>
      ) : (
        <Overlay hovered={hovered} overlayContent={overlayContent} />
      )}
    </Box>
  );
};

export default Image;
