import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  TableBody,
  Typography,
  Divider,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import orderAPI from "src/services/API/orderAPI";
import { toast } from "react-toastify";
import { formatPrice } from "src/utils/format-number";
import Image from "src/components/Image";
import payAPI from "src/services/API/payAPI";
import { set } from "lodash";
import { useRouter } from "src/routes/hooks";

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
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  unShowOverlay={true}
                  imageURL={product.imageUrl}
                  sx={{ height: 100, width: 100 }}
                />
              </TableCell>
              <TableCell align="left">{product.productName}</TableCell>
              <TableCell align="left">{product.sizeName}</TableCell>
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

const ModalContent = ({
  open,
  handleClose,
  order,
  updateOrder,
  setIsLoading,
}) => {
  const [newState, setNewSate] = useState(0);
  const [updatedOrder, setUpdatedOrder] = useState({
    orderId: "",
    orderCode: "",
    customerName: "",
    phoneNumber: "",
    address: "",
    createdDate: "",
    createdBy: "",
    status: 0,
    updatedDate: "",
    updatedBy: "",
    paymentLink: "",
    note: "",
    message: "",
    items: [],
  });
  const router = useRouter();
  useEffect(() => {
    if (open) {
      orderAPI
        .getOrderDetails(order)
        .then((res) => {
          setNewSate(res.status);
          setUpdatedOrder({
            orderId: res.orderId ? res.orderId : "",
            orderCode: res.orderCode ? res.orderCode : "",
            customerName: res.customerName ? res.customerName : "",
            phoneNumber: res.phoneNumber ? res.phoneNumber : "",
            address: res.address ? res.address : "",
            createdDate: res.createdDate ? res.createdDate : "",
            createdBy: res.createdBy ? res.createdBy : "",
            status: res.status,
            updatedDate: res.updatedDate ? res.updatedDate : "",
            updatedBy: res.updatedBy ? res.updatedBy : "",
            paymentLink: res.paymentLink ? res.paymentLink : "",
            note: res.note ? res.note : "",
            message: res.message ? res.message : "",
            items: res.items ? res.items : [],
          });
        })
        .catch((error) => toast.error(error));
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    handleUpdate();
    handleClose();
  };

  const handleUpdate = () => {
    updateOrder(updatedOrder);
  };

  const orderStatus = {
    0: {
      name: "Pending",
      color: "#f1c40f",
    },
    1: {
      name: "Paid",
      color: "#2ecc71",
    },
    2: {
      name: "Delivered",
      color: "#3498db",
    },
    3: {
      name: "Cancelled",
      color: "#e74c3c",
    },
  };

  const caculateTotal = () => {
    let total = 0;
    updatedOrder.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handlePay = () => {
    if (updatedOrder.status === 0) {
      if (updatedOrder.paymentLink) {
        window.open(updatedOrder.paymentLink, "_blank");
      } else {
        console.log(123);
        setIsLoading(true);
        payAPI
          .createPaymentLink(order)
          .then((res) => {
            window.open(res, "_blank");
            setUpdatedOrder((prevOrder) => ({
              ...prevOrder,
              paymentLink: res,
            }));
            setIsLoading(false);
          })
          .catch((error) => toast.error(error));
      }
    }
  };

  return (
    <>
      <DialogTitle>Order #{updatedOrder.orderCode}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sx={{ width: "100%" }} md={6}>
            <TextField
              margin="dense"
              name="customerName"
              label="Customer Name"
              fullWidth
              value={updatedOrder.customerName}
              disabled={newState === 3 || newState === 2}
              onChange={handleChange}
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }} md={6}>
            <TextField
              margin="dense"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              value={updatedOrder.phoneNumber}
              disabled={newState === 3 || newState === 2}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <TextField
          margin="dense"
          name="address"
          label="Address"
          fullWidth
          value={updatedOrder.address}
          disabled={newState === 3 || newState === 2}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="message"
          label="Message"
          fullWidth
          value={updatedOrder.message}
          disabled={newState === 3 || newState === 2}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          {/* createdDate, createdBy, status in 1 row */}
          <Grid item sx={{ width: "100%" }} md={4}>
            <TextField
              margin="dense"
              name="createdDate"
              label="Created Date"
              fullWidth
              value={updatedOrder.createdDate}
              onChange={handleChange}
              disabled
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }} md={4}>
            <TextField
              margin="dense"
              name="createdBy"
              label="Created By"
              fullWidth
              value={updatedOrder.createdBy}
              onChange={handleChange}
              disabled
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item sx={{ width: "100%", mt: 1 }} md={4}>
            {/* <Typography variant="caption">Status</Typography>
              <Typography
                sx={{
                  padding: "8px 40px",
                  color: "white",
                  fontWeight: "600",
                  
                }}
              >
                {orderStatus[updatedOrder.status].name}
              </Typography> */}
            <FormControl
              sx={{
                width: "100%",
              }}
            >
              <InputLabel
                sx={{ backgroundColor: "white", borderRadius: "8px" }}
              >
                Status
              </InputLabel>
              <Select
                value={updatedOrder.status}
                disabled={newState === 3 || newState === 2}
                onChange={(e) =>
                  setUpdatedOrder((prevOrder) => ({
                    ...prevOrder,
                    status: e.target.value,
                  }))
                }
                sx={{
                  backgroundColor: `${orderStatus[updatedOrder.status].color}`,
                  color: "white !important",
                }}
                label="Status"
              >
                <MenuItem value={0}>Waiting</MenuItem>
                <MenuItem value={1}>Paid</MenuItem>
                <MenuItem value={2}>Delivered</MenuItem>
                <MenuItem value={3}>Canceled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* updatedDate, updatedBy, message */}

        <TextField
          margin="dense"
          name="note"
          label="Note"
          fullWidth
          value={updatedOrder.note}
          disabled={newState === 3 || newState === 2}
          onChange={handleChange}
        />
        <ProductTable products={updatedOrder.items} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ mt: 2, px: 2 }}>
            <Typography variant="h6" textAlign={"right"} fontWeight={500}>
              Subtotal:{" "}
              <span style={{ marginLeft: "40px" }}>
                {formatPrice(caculateTotal())} VNĐ
              </span>
            </Typography>
            <Typography variant="h6" textAlign={"right"} fontWeight={500}>
              Tax (10%):{" "}
              <span style={{ marginLeft: "40px" }}>
                {formatPrice(Math.floor(caculateTotal() * 0.1))} VNĐ
              </span>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              textAlign={"right"}
              color={"secondary"}
              fontWeight={600}
              fontSize={"23px"}
            >
              Total:{" "}
              <span style={{ marginLeft: "40px" }}>
                {formatPrice(Math.floor(caculateTotal() * 1.1))} VNĐ
              </span>
            </Typography>
            <Box>
              <Button
                sx={{ mt: 2, width: "100%" }}
                variant="contained"
                onClick={handlePay}
                disabled={newState === 3 || newState === 2}
                color="success"
              >
                Payment link
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <Divider sx={{ my: 2 }} />
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="warning"
          sx={{ color: "white" }}
          disabled={newState === 3 || newState === 2}
        >
          Update
        </Button>
      </DialogActions>
    </>
  );
};

const UpdateModal = ({ open, handleClose, order, orderList, updateOrder }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      {isLoading ? (
        <Box sx={{ p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ModalContent
          open={open}
          order={order}
          handleClose={handleClose}
          setIsLoading={setIsLoading}
          orderList={orderList}
          updateOrder={updateOrder}
        />
      )}
    </Dialog>
  );
};

export default UpdateModal;
