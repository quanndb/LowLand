import { useState } from "react";
import { keepPreviousData, useQueries } from "@tanstack/react-query";

import productAPI from "src/services/API/productAPI";

import {
  Box,
  Button,
  Container,
  FormControl,
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
            <Container
              sx={{
                display: "flex",
                mb: " 30px",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <FormControl
                sx={{ width: { xs: "100%", sm: "200px" }, mb: "15px" }}
              >
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

              <Box
                sx={{
                  display: "flex",
                  height: "fit-content",
                  width: { xs: "100%", sm: "350px" },
                }}
              >
                <TextField
                  label="Search your favorite coffee..."
                  variant="outlined"
                  sx={{ width: "100%", mr: "10px" }}
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
              </Box>
            </Container>

            {/* search + select option */}
            {isFetching || !pageData ? (
              <ProductSkeleton />
            ) : (
              <ListProducts products={pageData?.response} />
            )}

            {/* Pagination Controls */}
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
                onChange={handlePageChange}
              />
            </Box>
          </FloatInOnScroll>
        </Container>
      }
    </>
  );
};
export default ProductsView;
