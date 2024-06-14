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
import { useState } from "react";

const ProductsMain = ({ categories, products }) => {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState("ALL PRODUCTS");

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
      const matchesMenu = menu === "ALL PRODUCTS";
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.originalPrices.toString().includes(search) ||
        product.salePrices.toString().includes(search);

      return matchesMenu && matchesSearch;
    });
  };

  const paginatedProducts = () => {
    const filteredProducts = filterProducts();
    console.log(filteredProducts);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  return (
    <Container maxWidth={"xxl"}>
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

      {/* search + select option */}

      {/* <Container sx={{ justifyContent: "center", mb: "50px" }} display={"flex"}>
        <Grid
          width={"100%"}
          container
          justifyContent={"center"}
          columns={{ md: 5, sm: 1 }}
        >
          {categories.map((item) => {
            return (
              <Grid
                item
                sm={1}
                sx={{ width: "100%", padding: "4px" }}
                key={item.id}
              >
                <Button
                  className="btnColor"
                  sx={{
                    width: "100%",
                    backgroundColor:
                      active === item.id ? "var(--secondary-color)" : "none",
                    color:
                      active === item.id ? "white" : "var(--secondary-color)",
                    "&:hover": {
                      backgroundColor:
                        active === item.id ? "var(--secondary-color)" : "none",
                      color:
                        active === item.id ? "white" : "var(--secondary-color)",
                      opacity: ".7",
                    },
                  }}
                  variant="outlined"
                  onClick={() => handleClickCategory(item.id)}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Container> */}

      <Container
        sx={{
          display: "flex",
          // , justifyContent: "end"
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
            <MenuItem value={"ALL PRODUCTS"}>ALL PRODUCTS</MenuItem>
            <MenuItem value={"COFFEE MUGS"}>COFFEE MUGS</MenuItem>
            <MenuItem value={"TEA MUGS"}>TEA MUGS</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
      </Container>

      {/* search + select option */}
      <AllProducts products={paginatedProducts()} />



       {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px', mb:"30px" }}>
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
