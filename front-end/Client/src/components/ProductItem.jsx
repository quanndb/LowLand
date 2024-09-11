import { Box, Paper, Typography } from "@mui/material";

import ProductImage from "./ProductImage";

import { useRouter } from "src/routes/hooks";
import { formatPrice } from "src/utils/format-number";
import { BorderBottom } from "@mui/icons-material";

const ProductItem = ({
  sx,
  imageURL,
  name,
  originalPrices,
  salePrices,
  isSale,
  id,
}) => {
  const router = useRouter();

  return (
    <Paper
      elevation={3}
      sx={{
        ...sx,
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textDecoration: "none",
        borderRadius: "20px",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 2px 14px 0 rgb(32 54 70 / 8%)",
          transform: "translateY(-10px)",
          scale: "1.01",
        },
        transition: "all 0.5s ease",
      }}
      component={"a"}
      href={`/products/${id}`}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/products/${id}`);
      }}
    >
      <ProductImage
        isSale={isSale}
        imageURL={imageURL}
        sx={{
          width: "100%",
          height: "300px",
          position: "relative",
          backgroundColor: "rgba(162, 95, 75, 0.02)",
        }}
      />
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "600",
          fontSize: "20px",
          color: "var(--primary-color)",
        }}
      >
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
          {isSale
            ? formatPrice(salePrices || 0)
            : formatPrice(originalPrices || 0)}
          <sup>đ</sup>
        </span>
        {isSale && (
          <span
            style={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "13px",
              marginLeft: "10px",
            }}
          >
            {formatPrice(originalPrices || 0)}
            <sup>đ</sup>
          </span>
        )}
      </Typography>
    </Paper>
  );
};
export default ProductItem;
