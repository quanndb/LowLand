import { useState } from "react";
import { keepPreviousData, useQueries } from "@tanstack/react-query";

import productAPI from "src/services/API/productAPI";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Productswiper from "../ProductSwipper";
import ListProducts from "../ListProducts";

import ProductSkeleton from "src/components/ProductSkeleton";
import { useDebounce } from "src/hooks/use-debounce";
import FloatInOnScroll from "src/components/FloatIn";
import ProductItem from "src/components/ProductItem";
import { formatPrice } from "src/utils/format-number";

const ProductsView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [menu, setMenu] = useState({ id: "", value: 0 });

  // useDebounce with search value
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: [pageData, productTypes],
    isFetching,
  } = useQueries({
    queries: [
      {
        queryKey: [
          "products",
          {
            page: currentPage,
            size: 12,
            query: debouncedSearch,
            productTypeId: menu.id,
            isActive: true,
          },
        ],
        queryFn: () =>
          productAPI.getProducts({
            page: currentPage,
            size: 12,
            query: debouncedSearch,
            productTypeId: menu.id,
            isActive: true,
          }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60,
      },
      {
        queryKey: ["product-types", { query: "" }],
        queryFn: () => productAPI.getProductTypes(""),
        staleTime: 1000 * 60,
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isFetching: results.some((result) => result.isFetching),
      };
    },
  });

  const handleMenuChange = (id, value) => {
    setMenu({ id, value });
    setCurrentPage(1);
  };

  return (
    <>
      {
        <Container maxWidth={"lg"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "50px 0px 10px 0px",
            }}
          >
            <Typography variant="h4" fontWeight={500}>
              Our Products
            </Typography>
            <Typography
              fontSize={14}
              sx={{
                marginTop: "20px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>
          <Productswiper />

          <FloatInOnScroll>
            <Grid
              container
              sx={{ mb: "50px", justifyContent: "space-between" }}
            >
              <Grid item xs={12} sm={3}>
                <FormControl sx={{ mb: "15px", width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Menu</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isFetching ? 0 : menu.value}
                    label="Menu"
                    onChange={(e) => {
                      const selectedItem = productTypes.find(
                        (item, index) => index + 1 === Number(e.target.value)
                      );
                      handleMenuChange(
                        selectedItem?.productTypeId || "",
                        e.target.value
                      );
                    }}
                  >
                    <MenuItem value={0}>All products</MenuItem>
                    {!isFetching &&
                      productTypes &&
                      productTypes.map((item, index) => (
                        <MenuItem value={index + 1} key={item.productTypeId}>
                          {item.typeName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sm={7}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "fit-content",
                }}
              >
                <TextField
                  label="Search your favorite coffee..."
                  variant="outlined"
                  sx={{ width: "80%", mr: "10px" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Button
                  startIcon={<SearchIcon />}
                  variant="contained"
                  sx={{ px: "20px" }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>

            <>
              {pageData ? (
                <Container maxWidth={"lg"}>
                  <Box>
                    <Grid
                      container
                      sx={{
                        justifyContent: "center",
                        width: "100%",
                        margin: "auto",
                      }}
                      spacing={{ sm: 4, xs: 3 }}
                    >
                      {pageData.response.map((item) => {
                        return (
                          <Grid item md={4} sm={6} xs={12} key={item.productId}>
                            <ProductItem
                              id={item.productId}
                              imageURL={item?.imageUrl}
                              isSale={Boolean(item?.salePrice)}
                              name={item.productName}
                              salePrices={formatPrice(item?.salePrice)}
                              originalPrices={formatPrice(item?.price)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Container>
              ) : (
                <>
                  <ProductSkeleton />
                  <ProductSkeleton />
                </>
              )}
            </>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                mb: "150px",
              }}
            >
              <Pagination
                count={pageData?.totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
              />
            </Box>
          </FloatInOnScroll>
        </Container>
      }
    </>
  );
};
export default ProductsView;
