import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import SideLayout from "src/layouts/sideLayout";
import { cart } from "src/redux/selectors/CartSelector";
import Image from "src/components/Image";
import { formatPrice } from "src/utils/format-number";
import { useEffect, useState } from "react";
import { set } from "lodash";
import orderAPI from "src/services/API/orderAPI";
import { user } from "src/redux/selectors/UserSelector";
import { toast } from "react-toastify";
import { useRouter } from "src/routes/hooks";
import payAPI from "src/services/API/payAPI";
import CartManagerSlice from "src/redux/slices/CartManagerSlice";

const ProductTable = ({ products }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "645px" }}>
      <Table
        sx={{ minWidth: 700, position: "relative" }}
        aria-label="spanning table"
      >
        <TableHead
          sx={{ backgroundColor: "#f1f1f1", position: "sticky", top: 0 }}
        >
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Products
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Details
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  imageURL={product.imageURL}
                  sx={{ height: 100, width: 100 }}
                  unShowOverlay={true}
                />
              </TableCell>
              <TableCell align="left">{product.productName}</TableCell>
              <TableCell align="left">{product.size}</TableCell>
              <TableCell align="left">{formatPrice(product.price)}</TableCell>
              <TableCell align="left">{product.quantity}</TableCell>
              <TableCell align="left">
                {formatPrice(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SubmitOrder = ({ data, setOpen, userData, setOrderId }) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    customerName: userData.customerName,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    items: data.map((product) => ({
      productDetailsId: product.productDetailsId,
      quantity: product.quantity,
    })),
    message: "",
  });

  useEffect(() => {
    setOrder((order) => ({
      ...order,
      customerName: userData.customerName,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
    }));
  }, [userData]);

  const caculateSubtotal = () => {
    const result = data.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return result;
  };

  const caculateTax = () => {
    return caculateSubtotal() * 0.05;
  };

  const handleOrder = () => {
    orderAPI
      .createOrder(order)
      .then((res) => {
        setOrderId(res);
        toast.success("Create your order successfully");
        dispatch(CartManagerSlice.actions.clearCart());
        setOpen(true);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Grid item sm={6}>
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <Typography sx={{ fontWeight: "600", fontSize: "20px", mr: 3 }}>
            Message:
          </Typography>
          <TextField
            label="Message for us"
            variant="standard"
            value={order.message}
            onChange={(e) => setOrder({ ...order, message: e.target.value })}
          />
        </Box>
        <Typography sx={{ mt: 2, fontSize: "14px" }}>
          Clicking "Order" means you agree to our{" "}
          <Typography component={"a"} color={"secondary"} href="#">
            Terms & Conditions.
          </Typography>
        </Typography>
      </Grid>
      <Grid item sm={4} xs={12} sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: "20px", mr: 3 }}>Subtotal</Typography>
          <Typography textAlign={"right"}>
            {formatPrice(caculateSubtotal())}
            <sup>₫</sup>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "20px", mr: 3 }}>Tax (5%)</Typography>
          <Typography textAlign={"right"}>
            {formatPrice(caculateTax())}
            <sup>₫</sup>
          </Typography>
        </Box>
        <Divider sx={{ my: 1, borderBottomWidth: "2px" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "20px", mr: 3 }}>Total</Typography>
          <Typography
            textAlign={"right"}
            color={"secondary"}
            sx={{ fontWeight: "600", fontSize: "20px" }}
          >
            {formatPrice(caculateSubtotal() + caculateTax())}
            <sup>₫</sup>
          </Typography>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          sx={{ my: 2, width: "100%" }}
          onClick={handleOrder}
        >
          Order
        </Button>
      </Grid>
    </Grid>
  );
};

const OrderPayment = ({ open, orderId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    router.replace("/user");
  };

  const handlePay = () => {
    setLoading(true);
    payAPI
      .createPaymentLink(orderId)
      .then((res) => {
        window.open(res, "_blank");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        router.replace("/user");
        setLoading(false);
      });
  };

  return (
    <Dialog open={open}>
      {loading ? (
        <Box sx={{ p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogTitle>Pay for now!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click pay now to pay for your order or you can pay later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button onClick={handlePay} variant="contained" color="success">
              Pay now
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

const CheckoutView = () => {
  const products = useSelector(cart);

  const data = useSelector(user);
  const [customerName, setCustomerName] = useState(data.fullName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [address, setAddress] = useState(data.address);

  const [open, setOpen] = useState(false);

  const [orderId, setOrderId] = useState(0);

  return (
    <SideLayout title="Checkout">
      <Container maxWidth="lg" disableGutters sx={{ py: "100px" }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", color: "#ee4d2d" }}>
            <AccountBoxIcon sx={{ mr: 1 }} />
            <Typography sx={{ fontWeight: "600" }}>
              Receiver's information
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "end",
            }}
          >
            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Box sx={{ mr: 3 }}>
                <Typography sx={{ fontWeight: "600", mr: 3 }}>
                  Customer name:{" "}
                </Typography>
                <TextField
                  color={"secondary"}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                ></TextField>
              </Box>
              <Box sx={{ mr: 3 }}>
                <Typography sx={{ fontWeight: "600", mr: 3 }}>
                  Phone numer:{" "}
                </Typography>
                <TextField
                  color={"secondary"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></TextField>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "600", mr: 3 }}>
                  Address:{" "}
                </Typography>
                <TextField
                  color={"secondary"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></TextField>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Box>
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              Order
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ my: 3 }}>
            <ProductTable products={products} />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <SubmitOrder
            data={products}
            setOpen={setOpen}
            userData={{
              customerName,
              phoneNumber,
              address,
            }}
            setOrderId={setOrderId}
          />
        </Paper>

        <OrderPayment open={open} setOpen={setOpen} orderId={orderId} />
      </Container>
    </SideLayout>
  );
};

export default CheckoutView;
