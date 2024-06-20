import { useSelector } from "react-redux";

import {
  Box,
  Button,
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
import { useState } from "react";
import { set } from "lodash";
import orderAPI from "src/services/API/orderAPI";
import { user } from "src/redux/selectors/UserSelector";
import { toast } from "react-toastify";
import { useRouter } from "src/routes/hooks";
import payAPI from "src/services/API/payAPI";

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
  const [order, setOrder] = useState({
    customerName: userData.fullName,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    items: data.map((product) => ({
      productDetailsId: 1,
      quantity: product.quantity,
    })),
    message: "",
  });

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
  const router = useRouter();

  const handleClose = () => {
    router.replace("/user");
  };

  const handlePay = () => {
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
      });
  };

  return (
    <Dialog open={open}>
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
    </Dialog>
  );
};

const CheckoutView = () => {
  const products = useSelector(cart);

  const data = useSelector(user);

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
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: "600", mr: 3 }}>
                Customer name:{" "}
                <Typography component={"span"} color={"secondary"}>
                  {data.fullName}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: "600", mr: 3 }}>
                Phone numer:{" "}
                <Typography color={"secondary"} component={"span"}>
                  {data.phoneNumber}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: "600", mr: 3 }}>
                Address:{" "}
                <Typography color={"secondary"} component={"span"}>
                  {data.address}
                </Typography>
              </Typography>
            </Box>
            <Button color="error" sx={{ textDecoration: "underline", pb: 0 }}>
              Change
            </Button>
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
            userData={data}
            setOrderId={setOrderId}
          />
        </Paper>

        <OrderPayment open={open} setOpen={setOpen} orderId={orderId} />
      </Container>
    </SideLayout>
  );
};

export default CheckoutView;
