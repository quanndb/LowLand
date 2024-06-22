import { useState } from "react";

import Productswiper from "./productswiper";
import AllProducts from "./allProducts";

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

const ProductsMain = ({ products }) => {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState("All products");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleClickCategory = (id) => {
    if (active !== id) {
      setActive(id);
    }
  };
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleChange = (event) => {
    setMenu(event.target.value);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const filterProducts = () => {
    return products.filter((product) => {
      const matchesMenu =
        menu === "All products" || product.productTypeName === menu;
      const matchesSearch =
        product.productName.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toString().includes(search);

      return matchesMenu && matchesSearch;
    });
  };

  const paginatedProducts = () => {
    const filteredProducts = filterProducts();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  return (
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
          variant="h6"
          fontSize={14}
          sx={{
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>
      <Productswiper />

      <Container
        sx={{
          display: "flex",
          mb: " 30px",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Menu</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={menu}
            label="Menu"
            onChange={handleChange}
          >
            <MenuItem value={"All products"}>All products</MenuItem>
            <MenuItem value={"Black coffee"}>Black coffee</MenuItem>
            <MenuItem value={"Brown coffee"}>Brown coffee</MenuItem>
            <MenuItem value={"Smell coffee"}>Smell coffee</MenuItem>
            <MenuItem value={"Weasel coffee"}>Weasel coffee</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex" }}>
          <TextField
            label="Search your favorite coffee..."
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
          />
          <Button startIcon={<SearchIcon />} variant="contained">
            Search
          </Button>
        </Box>
      </Container>

      {/* search + select option */}
      <AllProducts products={paginatedProducts()} />

      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          mb: "30px",
        }}
      >
        <Pagination
          count={Math.ceil(filterProducts().length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};
export default ProductsMain;
