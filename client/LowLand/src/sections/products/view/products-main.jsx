import "./index.css";
import Productswiper from "./productswiper";
import AllProducts from "./allProducts";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

const ProductsMain = () => {
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
      <Container sx={{justifyContent:"center"}} display={"flex"}>
        <Grid
          width={"100%"}
          container
          justifyContent={"center"}
          columns={{ md: 5, sm: 1 }}
        >
          <Grid item sm={1} sx={{ width: "100%", padding:"4px" }}>
            <Button
              className="btnColor"
              sx={{ width: "100%" }}
              variant="outlined"
            >
              ALL PRODUCTS
            </Button>
          </Grid>
          <Grid item sm={1} sx={{ width: "100%", padding:"4px" }}>
            <Button
              className="btnColor"
              sx={{ width: "100%" }}
              variant="outlined"
            >
              COFFEE MUGS
            </Button>
          </Grid>
          <Grid item sm={1} sx={{ width: "100%", padding:"4px" }}>
            <Button
              className="btnColor"
              sx={{ width: "100%" }}
              variant="outlined"
            >
              OTHERS
            </Button>
          </Grid>
          <Grid item sm={1} sx={{ width: "100%", padding:"4px" }}>
            <Button
              className="btnColor"
              sx={{ width: "100%" }}
              variant="outlined"
            >
              PREMIUM
            </Button>
          </Grid>
          <Grid item sm={1} sx={{ width: "100%", padding:"4px" }}>
            <Button
              className="btnColor"
              sx={{ width: "100%" }}
              variant="outlined"
            >
              TEA MUGS
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Productswiper />


      <AllProducts />
    </Container>
  );
};
export default ProductsMain;
