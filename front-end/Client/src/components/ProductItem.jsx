import { Box, Typography } from "@mui/material";

import ProductImage from "./ProductImage";

import { useRouter } from "src/routes/hooks";
import { formatPrice } from "src/utils/format-number";

const ProductItem = ({
  sx,
  imageURL,
  name,
  originalPrices,
  salePrices,
  isActive,
  id,
}) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        ...sx,
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => router.push(`/products/${id}`)}
    >
      <ProductImage
        isActive={isActive}
        imageURL={imageURL}
        sx={{ width: "100%", height: "400px", position: "relative" }}
      />
      <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
        {name}
      </Typography>

      <Typography
        sx={{
          textAlign: {
            md: "left",
            xs: "center",
          },
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <span style={{ color: "#a25f4b", fontSize: "25px" }}>
          {formatPrice(originalPrices || 0)}
          <sup>đ</sup>
        </span>
        {isActive && (
          <span
            style={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "13px",
              marginLeft: "10px",
            }}
          >
            {formatPrice(salePrices || 0)}
            <sup>đ</sup>
          </span>
        )}
      </Typography>
    </Box>
  );
};
export default ProductItem;
