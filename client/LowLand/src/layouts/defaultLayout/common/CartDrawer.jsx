import { useSelector } from "react-redux";

import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SideDrawer from "src/components/navigation/SideDrawer";
import { cartDrawer } from "src/redux/selectors/DrawerSelector";

const EmptyCartContent = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundImage: `url("static/images/empty-cart.jpg")`,
          width: "300px",
          height: "300px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          padding: "20px",
          marginBottom: "10px",
          opacity: "0.7",
        }}
      >
        Oops, There's nothing here!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{ fontWeight: "600" }}
      >
        Explore our products
      </Button>
    </Box>
  );
};

const CartContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
      }}
    >
      <EmptyCartContent />
    </Box>
  );
};

const CartDrawer = ({ children }) => {
  const open = useSelector(cartDrawer);

  return (
    <SideDrawer open={open} drawer="cart">
      <CartContent />
    </SideDrawer>
  );
};

export default CartDrawer;
