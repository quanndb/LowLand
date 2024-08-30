import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { SwiperSlide } from "swiper/react";

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
  Skeleton,
  ListItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HomeIcon from "@mui/icons-material/Home";

import { SwiperProducts } from "./SwiperProducts";

import CartManagerSlice from "src/redux/slices/CartManagerSlice";

import Image from "src/components/Image";
import ProductImage from "src/components/ProductImage";
import SectionTitle from "src/components/SectionTitle";
import { usePathname } from "src/routes/hooks";
import {
  BreadcrumItem,
  CustomizedBreadcrumbs,
} from "src/components/CustomBreadcum";
import { formatPrice } from "src/utils/format-number";
import { CustomSwiper } from "src/components/CustomSwiper";
import ButtonLink from "src/components/ButtonLink";
import ProductSkeleton from "src/components/ProductSkeleton";

const MaterialItem = ({ displayName, value, unit }) => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={`${displayName}: ${value} ${unit}`} />
      </ListItemButton>
    </ListItem>
  );
};

const DetailProductView = ({ productData, list, isFetching }) => {
  const id = uuidv4();

  const path = usePathname();

  const dispatch = useDispatch();

  const handleAddToCart = (
    productId,
    productName,
    imageUrl,
    quantity,
    price,
    sizeName,
    productDetailsId
  ) => {
    const newItem = {
      id: id,
      productID: productId,
      productName: productName,
      imageURL: imageUrl,
      quantity: quantity,
      price: price,
      size: sizeName,
      productDetailsId: productDetailsId,
    };
    dispatch(CartManagerSlice.actions.addToCart(newItem));
    toast.success("Add to cart successfully!");
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (productData?.sizesAndPrices[0])
      setSelectedSize(productData?.sizesAndPrices[0]);
  }, [productData]);

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
            href={path}
            label={`${
              productData?.productName ? productData.productName : "Loading..."
            }`}
          />
        </CustomizedBreadcrumbs>
        <Grid container sx={{ my: "60px" }}>
          {/* Here */}
          <Grid item md={6} xs={12}>
            {isFetching || !productData ? (
              <Skeleton
                sx={{ height: "100%", minHeight: "460px" }}
                variant="rectangular"
              />
            ) : (
              <CustomSwiper isProductSwipper={true}>
                {productData?.images.map((image) => (
                  <SwiperSlide key={image.productImageId}>
                    <ProductImage
                      sx={{
                        height: {
                          xs: "360px",
                          md: "460px",
                        },
                        width: "100%",
                      }}
                      imageURL={image.imageUrl}
                      isSale={false}
                      unShowOverlay={true}
                    />
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            )}
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
            sx={{
              padding: {
                xs: "30px",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
            }}
          >
            <Typography variant="h4">
              {productData?.productName ? (
                productData?.productName
              ) : (
                <Skeleton height={80} width={"100%"} />
              )}
            </Typography>

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
              {productData?.typeName ? (
                productData.typeName
              ) : (
                <Skeleton height={50} width={"60%"} />
              )}
            </Typography>

            {!selectedSize ? (
              <Skeleton height={50} width={"65%"} />
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
                  {formatPrice(
                    selectedSize?.salePrice
                      ? selectedSize.salePrice
                      : selectedSize.price
                  )}
                  <sup>đ</sup>
                </span>
                {selectedSize?.salePrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      fontSize: "13px",
                      marginLeft: "10px",
                    }}
                  >
                    {formatPrice(selectedSize?.price ? selectedSize.price : 0)}
                    <sup>đ</sup>
                  </span>
                )}
              </Typography>
            )}

            <Box>
              <Typography
                sx={{
                  opacity: "0.7",
                  fontSize: "14px",
                  mb: "10px",
                  marginRight: "10px",
                }}
              >
                Size
              </Typography>

              <List sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {!productData?.sizesAndPrices ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Skeleton sx={{ flex: 1, height: "80px", mx: 1 }} />
                    <Skeleton sx={{ flex: 1, height: "80px", mx: 1 }} />
                    <Skeleton sx={{ flex: 1, height: "80px", mx: 1 }} />
                  </Box>
                ) : (
                  <>
                    {productData?.sizesAndPrices?.map((size) => {
                      return (
                        <ListItem disablePadding>
                          <ListItemButton
                            key={size.productSizeId}
                            onClick={() => setSelectedSize(size)}
                            sx={{
                              border: "1px solid #ccc",
                              py: "5px",
                              borderRadius: "5px",
                              cursor: "pointer",
                              textAlign: "center",
                              backgroundColor:
                                size.productSizeId ===
                                selectedSize?.productSizeId
                                  ? "var(--secondary-color)"
                                  : "transparent",
                              color:
                                size.productSizeId ===
                                selectedSize?.productSizeId
                                  ? "white"
                                  : "dark",
                              "&:hover": {
                                backgroundColor: "var(--secondary-color)",
                                opacity: ".7",
                                color: "white",
                              },
                            }}
                          >
                            <ListItemText primary={size.sizeName} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </>
                )}
              </List>
            </Box>

            <Typography
              sx={{
                opacity: "0.7",
                fontSize: "14px",
                mb: "10px",
                marginRight: "10px",
              }}
            >
              Quantity
            </Typography>
            {!selectedSize ? (
              <Box display={"flex"}>
                <Skeleton height={90} width={"35%"} sx={{ mr: "20px" }} />
                <Skeleton height={90} width={"65%"} />
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", position: "relative", mr: "20px" }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      left: 0,
                      transform: "translateY(10%)",
                    }}
                    onClick={handleDecreaseQuantity}
                    title="Decrease quantity"
                  >
                    <RemoveCircleIcon color="secondary" />
                  </IconButton>
                  <input
                    value={quantity}
                    onChange={(e) => handleChangQuantity(e.target.value)}
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
                    aria-label="Quantity"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      right: 0,
                      transform: "translateY(10%)",
                    }}
                    onClick={handleIncreaseQuantity}
                    title="Increase quantity"
                  >
                    <AddCircleIcon color="secondary" />
                  </IconButton>
                </Box>

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
                      productData.productId,
                      productData.productName,
                      productData.images[0].imageUrl,
                      quantity,
                      selectedSize.price,
                      selectedSize.sizeName,
                      selectedSize.productDetailsId
                    )
                  }
                >
                  ADD TO CART
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        <Grid container sx={{ opacity: "0.5", my: "50px" }}>
          <Grid item md={6} xs={12}>
            <Typography sx={{ textTransform: "uppercase" }}>details</Typography>

            {!productData?.description ? (
              <>
                <Skeleton height={"50px"} width={"90%"} />
                <Skeleton height={"50px"} width={"90%"} />
                <Skeleton height={"50px"} width={"50%"} />
              </>
            ) : (
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
                {productData?.description}
              </Typography>
            )}
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

            {!productData?.recipes ? (
              <>
                <Skeleton width={"80%"} height={"50px"} />
                <Skeleton width={"70%"} height={"50px"} />
                <Skeleton width={"75%"} height={"50px"} />
              </>
            ) : (
              <List>
                {productData?.recipes?.map((item) => (
                  <MaterialItem
                    key={item.productRecipeId}
                    displayName={item.materialName}
                    value={item.quantity}
                    unit={item.unitName}
                  />
                ))}
              </List>
            )}
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={"100%"}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Image
              imageURL={"/static/images/premiumProductDetail.jpg"}
              unShowOverlay={true}
              sx={{ width: "100%", height: "100%", minHeight: "460px" }}
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
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <StarBorder sx={{ color: "white", fontSize: "40px" }} />
                  </ListItemIcon>
                  <Box>
                    <ListItemText primary="Premium Quality" />
                    <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in." />
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <StarBorder sx={{ color: "white", fontSize: "40px" }} />
                  </ListItemIcon>
                  <Box>
                    <ListItemText primary="Gentle to the Environment" />
                    <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in." />
                  </Box>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <SectionTitle>YOU MIGHT ALSO LIKE THESE</SectionTitle>

      <Container maxWidth={"lg"} sx={{ mb: "50px" }}>
        {isFetching || !list ? (
          <ProductSkeleton />
        ) : (
          <SwiperProducts maxWidth={"lg"} list={list} />
        )}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <ButtonLink variant={"contained"} href={"/products"}>
            VIEW ALL PRODUCTS
          </ButtonLink>
        </Box>
      </Container>
    </>
  );
};
export default DetailProductView;
