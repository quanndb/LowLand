import { Box, Button, Typography } from "@mui/material";
import ProductImage from "./ProductImage";
import { useRouter } from "src/routes/hooks";

const ProductItem = ({
  sx,
  imageURL,
  name,
  originalPrices,
  salePrices,
  isSale,
  id
}) => {

  const router = useRouter();

  return (
    <Box
      sx={{
        ...sx,
        position: "relative",
        display:"flex", alignItems:"center",
        flexDirection: "column",
      }
    }
    onClick={() => router.push(`/products/${id}`)}

    >

      <ProductImage isSale={isSale} imageURL={imageURL} sx={{width: {
        xs:"280px",
        md:"350px"
      }, height: "400px", position: "relative"}}/>
      <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
        {name}
      </Typography>

      {isSale ? (
        <Typography
          sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
        >
          <span style={{ color: "#a25f4b", fontSize: "18px" }}>
            {salePrices}
            <sup>đ</sup>
          </span>
          <span
            style={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "13px",
            }}
          >
            {originalPrices}
            <sup>đ</sup>
          </span>
        </Typography>
      ) : (
        <Typography
          sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
        >
          <span style={{ color: "#a25f4b", fontSize: "18px" }}>
            {originalPrices}
            <sup>đ</sup>
          </span>
        </Typography>
      )}
    </Box>
  );
};
export default ProductItem;
