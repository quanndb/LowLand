import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

import SideDrawer from "src/components/navigation/SideDrawer";
import { cartDrawer } from "src/redux/selectors/DrawerSelector";
import { cart } from "src/redux/selectors/CartSelector";
import Image from "src/components/Image";
import CartManagerSlice from "src/redux/slices/CartManager";
import { formatPrice } from "src/utils/format-number";

const EmptyCartContent = () => {
  return (
    <Box sx={{ p: "10px" }}>
      <Image
        imageURL={"static/images/empty-cart.jpg"}
        sx={{
          width: "100%",
          height: "300px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        unShowOverlay={true}
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

const CartItem = ({ id, imageURL, productName, price, quantity }) => {
  const dispatch = useDispatch();

  const handleSetQuantity = (e) => {
    if (e.target.value > 0 && e.target.value < 10001)
      dispatch(
        CartManagerSlice.actions.setQuantity({
          id: id,
          quantity: Number(e.target.value),
        })
      );
  };

  const handleRemoveItem = () => {
    dispatch(CartManagerSlice.actions.removeFromCart(id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        p: "10px",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        mb: "10px",
      }}
    >
      <Image
        imageURL={imageURL}
        sx={{ width: "80px", height: "80px", mr: "15px" }}
        unShowOverlay={true}
      />
      <Box sx={{ textAlign: "left", mr: "15px" }}>
        <Typography sx={{ fontWeight: "600", opacity: "0.8" }}>
          {productName}
        </Typography>
        <Typography sx={{ opacity: "0.6" }}>
          {price}
          <span> VNĐ</span>
        </Typography>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveItem}
        >
          REMOVE
        </Button>
      </Box>
      <input
        type="number"
        style={{
          width: "60px",
          height: "40px",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "15px",
          overflow: "hidden",
        }}
        value={quantity}
        onChange={handleSetQuantity}
      />
    </Box>
  );
};

const CartListItem = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderTop: "1px solid #ddd",
        py: "5px",
        px: "2px",
        overflowY: "scroll",
      }}
    >
      {data.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            imageURL={item.imageURL}
            productName={item.productName}
            price={item.price}
            quantity={item.quantity}
          />
        );
      })}
    </Box>
  );
};

const CartFooter = ({ total }) => {
  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        p: "30px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "25px",
        }}
      >
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          Subtotal
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            color={"error"}
            sx={{ fontWeight: "600", fontSize: "20px", mr: "5px" }}
          >
            {total ? formatPrice(total) : 0}
          </Typography>
          <Typography
            color={"error"}
            sx={{ fontWeight: "600", fontSize: "20px", mr: "5px" }}
          >
            VNĐ
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: "20px" }} />
      <Button variant="contained">CONTINUE TO CHECKOUT</Button>
    </Box>
  );
};

const CartLayout = ({ data }) => {
  const handleCaculateTotal = () => {
    return data.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  return (
    <Box
      sx={{
        p: "10px",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CartListItem data={data} />
      <CartFooter total={handleCaculateTotal()} />
    </Box>
  );
};

const CartContent = () => {
  const cartList = useSelector(cart);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: "60px",
        px: "10px",
        width: "330px",
        height: "100%",
      }}
    >
      {cartList.length ? <CartLayout data={cartList} /> : <EmptyCartContent />}
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
