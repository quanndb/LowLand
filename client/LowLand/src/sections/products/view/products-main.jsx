import Productswiper from "./productswiper";
import AllProducts from "./allProducts";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";

const ProductsMain = ({ categories }) => {
  const [active, setActive] = useState(0);

  const handleClickCategory = (id) => {
    if (active !== id) {
      setActive(id);
    }
  };

  return (
    <Container>
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
      <Container sx={{ justifyContent: "center" }} display={"flex"}>
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
      </Container>
      <Productswiper />

      <AllProducts />
    </Container>
  );
};
export default ProductsMain;
