// import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Link, Card, Stack, Typography } from "@mui/material";
import Label from "src/components/label";
import { fCurrency } from "src/utils/format-number";

export default function ShopProductCard({ product, onClick }) {
  const [isErrorImage, setIsErrorImage] = useState(false);
  return (
    <Card
      key={product.id}
      onClick={() => onClick(product)}
      title={product.productName}
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 2px 14px 0 rgb(32 54 70 / 8%)",
          transform: "translateY(-4px)",
          scale: "1.01",
        },
        opacity: `${product.isActive ? "1" : "0.5"}`,
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {product.salePrice && (
          <Label
            variant="filled"
            color="error"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            Sale
          </Label>
        )}
        {!product.isActive && (
          <Label
            variant="filled"
            color="warning"
            sx={{
              zIndex: 9,
              top: 16,
              left: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            Not active
          </Label>
        )}
        <Box
          component="img"
          alt={product.productName}
          src={isErrorImage ? "/static/images/logo.jpg" : product.imageUrl}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: "cover",
            position: "absolute",
          }}
        />
        <img
          alt={product.productName}
          src={product.imageUrl}
          onError={() => setIsErrorImage(true)}
          style={{
            display: "none",
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.productName}
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: "bold" }} color={"error"}>
            {fCurrency(product.salePrice ? product.salePrice : product.price) +
              "đ"}
          </Typography>
          {product.salePrice && (
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                }}
              >
                {fCurrency(product.price)} đ
              </Typography>
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
