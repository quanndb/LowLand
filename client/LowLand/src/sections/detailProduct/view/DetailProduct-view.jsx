import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { StarBorder } from "@mui/icons-material";
import {
  List,
  Button,
  Container,
  Grid,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HomeIcon from "@mui/icons-material/Home";

import Image from "src/components/Image";
import ProductImage from "src/components/ProductImage";
import SectionTitle from "src/components/SectionTitle";
import CartManagerSlice from "src/redux/slices/CartManager";
import { useRouter } from "src/routes/hooks";
import { SwiperProducts } from "./SwiperProducts";
import {
  BreadcrumItem,
  CustomizedBreadcrumbs,
} from "src/components/CustomBreadcum";

const formatMapping = {
  ice: { displayName: "ice", unit: "" },
  milk_type: { displayName: "milk type", unit: "" },
  flavor_syrup: { displayName: "flavor syrup", unit: "" },
  whipped_cream: { displayName: "whipped cream", unit: "" },
  sugar: { displayName: "sugar", unit: "gam" },
  cafe: { displayName: "cafe", unit: "gam" },
  milk: { displayName: "milk", unit: "gam" },
};

const MaterialItem = ({ displayName, value, unit }) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={`${displayName}: ${value} ${unit}`} />
    </ListItemButton>
  );
};

const DetailProductView = ({ product, list }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const handleAddToCart = (id, name, imageURL, quantity, price) => {
    const newItem = {
      productID: id,
      productName: name,
      imageURL: imageURL,
      quantity: quantity,
      price: price,
    };
    dispatch(CartManagerSlice.actions.addToCart(newItem));
    toast.success("Add to cart successfully!");
  };

  const [quantity, setQuantity] = useState(1);
  const handleChangQuantity = (value) => {
    let regex = /^-?\d+$/;
    if (value === "") {
      setQuantity(1);
    }
    if (!regex.test(value)) {
      return;
    }
    if (value > 0 && value < 10000) {
      setQuantity(Number(value));
    }
  };

  const handleIncreaseQuantity = () => {
    handleChangQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    handleChangQuantity(quantity - 1);
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        <CustomizedBreadcrumbs sx={{ mt: "40px" }}>
          <BreadcrumItem
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <BreadcrumItem component="a" href="/products" label="Products" />
          <BreadcrumItem
            component="a"
            href={`/products/${product.id}`}
            label={`${product.name}`}
          />
        </CustomizedBreadcrumbs>
        <Grid container sx={{ my: "100px" }}>
          <Grid item md={6} xs={12}>
            <ProductImage
              sx={{
                height: {
                  xs: "360px",
                  md: "460px",
                },
                width: "100%",
              }}
              imageURL={product.imageURL}
              isSale={product.isSale}
              unShowOverlay={true}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            sx={{
              padding: {
                xs: "30px",
                md: "60px",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
            }}
          >
            <Typography variant="h4">{product.name}</Typography>

            <Typography
              sx={{
                width: {
                  sm: "100%",
                  md: "80%",
                },
                opacity: "0.5",
                mt: "10px",
              }}
            >
              {product.title}
            </Typography>

            {product.isSale ? (
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
                  {product.salePrices}
                  <sup>đ</sup>
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "13px",
                    marginLeft: "10px",
                  }}
                >
                  {product.originalPrices}
                  <sup>đ</sup>
                </span>
              </Typography>
            ) : (
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
                  {product.originalPrices}
                  <sup>đ</sup>
                </span>
              </Typography>
            )}

            <Typography sx={{ opacity: "0.5", fontSize: "12px", mb: "10px" }}>
              QUANTITY
            </Typography>

            <Grid container>
              <Grid
                item
                md={3}
                xs={12}
                sx={{
                  mb: {
                    md: "0px",
                    xs: "10px",
                  },
                }}
              >
                <Box sx={{ display: "flex", position: "relative" }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      left: 0,
                      transform: "translateY(10%)",
                    }}
                    onClick={handleDecreaseQuantity}
                  >
                    <RemoveCircleIcon color="secondary" />
                  </IconButton>
                  <input
                    value={quantity}
                    onChange={(e) => handleChangQuantity(e.target.value)}
                    //handle press up and down button
                    onKeyDown={(e) => {
                      e.key === "ArrowUp" ? handleIncreaseQuantity() : "";
                      e.key === "ArrowDown" ? handleDecreaseQuantity() : "";
                    }}
                    style={{
                      fontSize: "23px",
                      height: "100%",
                      width: "100%",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      right: 0,
                      transform: "translateY(10%)",
                    }}
                    onClick={handleIncreaseQuantity}
                  >
                    <AddCircleIcon color="secondary" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    height: "100%",
                    ml: {
                      xs: "0px",
                      md: "10px",
                    },
                    padding: "8px",
                    width: "100%",
                  }}
                  onClick={() =>
                    handleAddToCart(
                      product.id,
                      product.name,
                      product.imageURL,
                      quantity,
                      product.isSale
                        ? product.salePrices
                        : product.originalPrices
                    )
                  }
                >
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ opacity: "0.5", my: "50px" }}>
          <Grid item md={6} xs={12}>
            <Typography sx={{ textTransform: "uppercase" }}>details</Typography>

            <Typography
              sx={{
                mt: "10px",
                width: {
                  md: "75%",
                  xs: "100%",
                },
                padding: "10px",
              }}
            >
              {product.detail}
            </Typography>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            sx={{
              paddingLeft: {
                xs: "0px",
                md: "60px",
              },
            }}
          >
            <Typography sx={{ textTransform: "uppercase" }}>
              materials
            </Typography>

            <List>
              {Object.entries(product.materials).map(([key, value]) => (
                <MaterialItem
                  key={key}
                  displayName={formatMapping[key]?.displayName || key}
                  value={value}
                  unit={formatMapping[key]?.unit || ""}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={"100%"}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Image
              imageURL={"/static/images/premiumProductDetail.jpg"}
              unShowOverlay={true}
              sx={{ width: "100%", height: "460px" }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              padding: {
                md: "60px",
                xs: "10px",
              },
              textAlign: {
                md: "left",
                xs: "center",
              },
            }}
          >
            <Typography
              sx={{ fontSize: "22px", mb: "15px", fontWeight: "bold" }}
            >
              Handmade by CoffeeStyle.
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                width: {
                  md: "70%",
                  xs: "100%",
                },
              }}
            >
              The most versatile furniture system ever created. Designed to fit
              your life.
            </Typography>

            <List>
              <ListItemButton>
                <ListItemIcon>
                  <StarBorder sx={{ color: "white", fontSize: "40px" }} />
                </ListItemIcon>
                <Box>
                  <ListItemText primary="Premium Quality" />
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in." />
                </Box>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <StarBorder sx={{ color: "white", fontSize: "40px" }} />
                </ListItemIcon>
                <Box>
                  <ListItemText primary="Gentle to the Environment" />
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in." />
                </Box>
              </ListItemButton>
            </List>
          </Grid>
        </Grid>
      </Container>

      <SectionTitle>YOU MIGHT ALSO LIKE THESE</SectionTitle>

      <Container maxWidth={"lg"} sx={{ mb: "50px" }}>
        <SwiperProducts maxWidth={"lg"} list={list} />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => router.replace("/products")}
          >
            VIEW ALL PRODUCTS
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default DetailProductView;
