import { useState } from "react";
import {
  Box,
  Pagination,
  Typography,
  Grid,
  Container,
  Button,
  Card,
  Skeleton,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProductCard from "../product-card";
import ProductDetailModal from "./ProductDetailModal";
import AddProductModal from "./AddProductModal";
import productAPI from "src/services/API/productAPI";
import { useQueries, useQuery } from "@tanstack/react-query";
import productTypeAPI from "src/services/API/productTypeAPI";
import Iconify from "src/components/iconify";
import { useDebounce } from "src/hooks/use-debounce";
import Image from "src/components/Image";

export default function ProductsView() {
  // products
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState({
    isActive: "",
    value: -1,
  });
  const queryDebounce = useDebounce(query, 500);
  // product types
  const [selectdType, setSelectedType] = useState({
    productTypeId: "",
    value: -1,
  });
  // query
  const {
    data: [productsPage, productTypes],
    refetch,
  } = useQueries({
    queries: [
      {
        queryKey: [
          "products",
          {
            page,
            size: 8,
            productTypeId: selectdType.productTypeId,
            query: queryDebounce,
            isActive: isActive.isActive,
          },
        ],
        queryFn: () =>
          productAPI.getProducts({
            page,
            size: 8,
            productTypeId: selectdType.productTypeId,
            query: queryDebounce,
            isActive: isActive.isActive,
          }),
        keepPreviousData: true,
        staleTime: 60 * 1000,
      },
      {
        queryKey: ["productTypes"],
        queryFn: () => productTypeAPI.getProductTypes(),
        staleTime: 60 * 1000,
      },
    ],
    combine: (res) => {
      return {
        data: res.map((r) => r.data),
        refetch: () => Promise.all(res.map((r) => r.refetch())),
      };
    },
  });
  // modal
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Card
        sx={{
          bgcolor: "background.paper",
          mb: 3,
          p: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={8} md={9}>
            <Tabs
              value={selectdType.value}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              <Tab
                label="All"
                value={-1}
                onClick={() => {
                  setSelectedType({
                    productTypeId: "",
                    value: -1,
                  });
                  setPage(1);
                }}
              />
              {productTypes &&
                productTypes.map((productType, index) => (
                  <Tab
                    key={productType.productTypeId}
                    label={productType.typeName}
                    value={index}
                    onClick={() => {
                      setSelectedType({
                        productTypeId: productType.productTypeId,
                        value: index,
                      });
                      setPage(1);
                    }}
                  />
                ))}
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "right" } }}
          >
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setOpenAddModal(true)}
              sx={{
                mt: { xs: 2, sm: 0 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              New product
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          bgcolor: "background.paper",
          mb: 3,
          py: 2,
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mx: 2,
            }}
          >
            <TextField
              label="Search product"
              placeholder="Search product"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              fullWidth
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                height: { xs: "auto", md: "55px" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sx={{ mx: 2 }}>
            <FormControl
              sx={{
                width: "100%",
                minWidth: 120,
                display: "flex",
              }}
            >
              <InputLabel>Active</InputLabel>
              <Select
                value={isActive.value || 0}
                label="Product type"
                onChange={(e) => {
                  setIsActive({
                    isActive: e.target.value === -1 ? "" : e.target.value,
                    value: e.target.value,
                  });
                  setPage(1);
                }}
              >
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={0}>
                  <Iconify
                    icon="zondicons:close-solid"
                    sx={{ color: "#ba1f1d", mr: 1 }}
                  />
                  Inactive
                </MenuItem>
                <MenuItem value={1}>
                  <Iconify
                    icon="teenyicons:tick-circle-solid"
                    sx={{ color: "green", mr: 1 }}
                  />
                  Active
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        {productsPage ? (
          <>
            {productsPage.response.map((product) => (
              <Grid key={product.productId} item xs={12} sm={6} md={3}>
                <ProductCard
                  product={product}
                  onClick={() => {
                    setSelectedProduct(product.productId);
                    setOpenEditModal(true);
                  }}
                />
              </Grid>
            ))}

            {productsPage.totalRecords === 0 && (
              <Grid item xs={12}>
                <Card>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 700,
                      p: 5,
                    }}
                  >
                    No products found for &quot;{query}&quot;
                  </Typography>
                  <Image
                    imageURL={"/static/images/404.jpg"}
                    unShowOverlay={true}
                    sx={{
                      height: 300,
                      width: 300,
                      mx: "auto",
                      mb: 5,
                      borderRadius: "50%",
                    }}
                  />
                </Card>
              </Grid>
            )}
          </>
        ) : (
          // 8 skeleton using map loop
          Array(8)
            .fill(0)
            .map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <Box sx={{ p: 3 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width={"60%"} />
                  </Box>
                </Card>
              </Grid>
            ))
        )}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={productsPage ? productsPage.totalPages : 1}
          page={page}
          onChange={(e, v) => setPage(v)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      <ProductDetailModal
        productId={selectedProduct}
        open={openEditModal}
        onClose={() => {
          setSelectedProduct("");
          setOpenEditModal(false);
        }}
        refetch={refetch}
      />
      {/*
      <AddProductModal
        setSp={setSp}
        open={addModalOpen}
        onClose={handleCloseAddModal}
        onAddProduct={handleAddProduct}
      /> */}
    </Container>
  );
}
