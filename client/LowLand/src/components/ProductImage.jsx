import { Box, Button, Typography } from "@mui/material";
import Image from "./Image";

const ProductImage = ({ sx, imageURL, isSale, unShowOverlay }) => {
  return (
    <Box
      sx={{
        ...sx,
        position: "relative",
      }}
    >
      <Image
        imageURL={imageURL}
        sx={{ ...sx }}
        unShowOverlay={unShowOverlay ? unShowOverlay : null}
      />
      {isSale ? (
        <Button
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            margin: "8px",
            backgroundColor: "white",
            color: "var(--secondary-color)",
          }}
        >
          On Sale
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ProductImage;
