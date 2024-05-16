import { Box, Button, Typography } from "@mui/material";
import Image from "./Image";

const ProductItem = ({
  sx,
  url,
  imageURL,
  title,
  originalPrices,
  salePrices,
  isSale,
}) => {
  return (
    <Box
      sx={{
        ...sx,
        position:"relative",
      }}
    >
      <Image
        url={imageURL}
        sx={{ width: "350px", height: "400px", posiion: "relative" }}
      />
      <Button sx={{position: "absolute", top:"0", right:"0", margin:"8px", backgroundColor: "white", color: "var(--secondary-color)" }}>On Sale</Button>
      <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
        Red Love Cup
        {/* {title} */}
      </Typography>

      <Typography
        sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
      >
        <span style={{ color: "#a25f4b", fontSize: "18px" }}>
          50.000
          {/* {originalPrices} */}
          <sup>đ</sup>
        </span>
        <span
          style={{
            textDecoration: "line-through",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <span> </span>70.000
          {/* {salePrices} */}
          <sup>đ</sup>
        </span>
      </Typography>
    </Box>
  );
};
export default ProductItem;
