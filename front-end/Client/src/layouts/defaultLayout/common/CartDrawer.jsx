import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, Button, Divider, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import SideDrawer from "src/components/navigation/SideDrawer";
import Image from "src/components/Image";

import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import CartManagerSlice from "src/redux/slices/CartManagerSlice";
import { cart } from "src/redux/selectors/CartSelector";
import { cartDrawer } from "src/redux/selectors/DrawerSelector";

import { useRouter } from "src/routes/hooks";
import useGetResize from "src/hooks/use-get-resize";
import { formatPrice } from "src/utils/format-number";
import ButtonLink from "src/components/ButtonLink";

const EmptyCartContent = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <Box sx={{ p: "10px" }}>
      <Image
        imageURL={"/static/images/empty-cart.jpg"}
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
          padding: "15px",
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
        onClick={() => {
          dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(false));
          router.replace("/products");
        }}
      >
        Explore our products
      </Button>
    </Box>
  );
};

const CartItem = ({
  id,
  productID,
  imageURL,
  productName,
  price,
  quantity,
  size,
}) => {
  const dispatch = useDispatch();

  const handleSetQuantity = (e) => {
    let regex = /^-?\d+$/;
    if (e === "") {
      dispatch(
        CartManagerSlice.actions.setQuantity({
          id: id,
          quantity: Number(1),
        })
      );
    }
    if (!regex.test(e)) {
      return;
    }
    if (e > 0 && e < 10000)
      dispatch(
        CartManagerSlice.actions.setQuantity({
          id: id,
          quantity: Number(e),
        })
      );
  };
  const handleIncreaseQuantity = () => {
    handleSetQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    handleSetQuantity(quantity - 1);
  };

  const handleRemoveItem = () => {
    dispatch(CartManagerSlice.actions.removeFromCart(id));
  };

  const handleChangeSize = (e) => {
    dispatch(
      CartManagerSlice.actions.setSize({
        id: id,
        size: e.target.value,
      })
    );
  };

  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        p: "10px",
        mb: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", mr: "15px", flex: 1 }}
        >
          <Image
            imageURL={imageURL}
            sx={{ width: "80px", height: "80px", mr: "15px" }}
            unShowOverlay={true}
          />
          <Box sx={{ textAlign: "left", wordBreak: "break-word", flex: 1 }}>
            <Typography sx={{ fontWeight: "600", opacity: "0.8" }}>
              {productName}
            </Typography>
            <Typography>
              Size: <span>{size}</span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", position: "relative", mt: 2, mx: "auto" }}>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              left: 0,
              transform: "translateY(10%)",
            }}
            onClick={handleDecreaseQuantity}
          >
            <RemoveCircleIcon color="secondary" />
          </IconButton>
          <input
            value={quantity}
            onChange={(e) => handleSetQuantity(e.target.value)}
            //handle press up and down button
            onKeyDown={(e) => {
              e.key === "ArrowUp" ? handleIncreaseQuantity() : "";
              e.key === "ArrowDown" ? handleDecreaseQuantity() : "";
            }}
            style={{
              fontSize: "18px",
              height: "50px",
              width: "100px",
              padding: "8px",
              textAlign: "center",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              transform: "translateY(10%)",
            }}
            onClick={handleIncreaseQuantity}
          >
            <AddCircleIcon color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "10px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Typography sx={{ opacity: "0.6" }}>
          {formatPrice(price)}
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
            id={item.id}
            key={item.id}
            productID={item.productID}
            imageURL={item.imageURL}
            productName={item.productName}
            price={item.price}
            quantity={item.quantity}
            size={item.size}
          />
        );
      })}
    </Box>
  );
};

const CartFooter = ({ total }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      <ButtonLink
        variant="contained"
        href={"/checkout"}
        onClick={() => {
          dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(false));
        }}
      >
        CONTINUE TO CHECKOUT
      </ButtonLink>
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

  const [windowWidth, setWindowWidth] = useGetResize();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: "60px",
        px: "10px",
        height: "100%",
        maxWidth: "800px",
        width: windowWidth < 450 ? windowWidth : "450px",
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
