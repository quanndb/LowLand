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

import LoadingComp from "src/components/loading/LoadingComp";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const ModalContent = ({ onClose, orderDetails, refetch, refetchOrder }) => {
  const orderStatus = {
    0: {
      value: "WAITING",
      color: "#FF9800",
    },
    1: {
      value: "PAID",
      color: "#2196F3",
    },
    2: {
      value: "DELIVERED",
      color: "#4CAF50",
    },
    3: {
      value: "CANCELED",
      color: "#F44336",
    },
  };

  const [order, setOrder] = useState(orderDetails);

  const { mutate: createPaymentLink, isPending: isCreatePaymentLink } =
    useMutation({
      mutationKey: (orderId) => ["createPaymentLink", { orderId: orderId }],
      mutationFn: (orderId) => payAPI.createPaymentLink(orderId),
    });

  const { mutate: updateOrder, isPending: isUpdateOrder } = useMutation({
    mutationKey: (order) => ["updateOrder", { orderId: order.orderId }],
    mutationFn: (order) => orderAPI.updateOrder(order.orderId, order),
  });

  const caculateTotal = () => {
    let total = 0;
    order.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handlePay = () => {
    if (order.paymentLink) {
      window.open(order.paymentLink, "_blank");
    } else {
      createPaymentLink(order.orderId, {
        onSuccess: (data) => {
          window.open(data, "_blank");
          setOrder({
            ...order,
            paymentLink: data,
          });
        },
      });
    }
  };

  const handleSubmit = () => {
    updateOrder(order, {
      onSuccess: () => {
        toast.success("Update success");
        refetchOrder();
        refetch();
      },
    });
  };

  return (
    <>
      {order && (
        <>
          <LoadingComp isLoading={isCreatePaymentLink || isUpdateOrder} />
          <DialogTitle>Order #{order.orderCode}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sx={{ width: "100%" }} md={6}>
                <TextField
                  margin="dense"
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  value={order.customerName || ""}
                  disabled={
                    orderDetails.status === 3 || orderDetails.status === 2
                  }
                  onChange={(e) =>
                    setOrder({ ...order, customerName: e.target.value })
                  }
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }} md={6}>
                <TextField
                  margin="dense"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  value={order.phoneNumber || ""}
                  disabled={
                    orderDetails.status === 3 || orderDetails.status === 2
                  }
                  onChange={(e) =>
                    setOrder({ ...order, phoneNumber: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <TextField
              margin="dense"
              name="address"
              label="Address"
              fullWidth
              value={order.address || ""}
              disabled={orderDetails.status === 3 || orderDetails.status === 2}
              onChange={(e) => setOrder({ ...order, address: e.target.value })}
            />
            <TextField
              margin="dense"
              name="message"
              label="Message"
              fullWidth
              value={order.message || ""}
              disabled={orderDetails.status === 3 || orderDetails.status === 2}
              onChange={(e) => {
                setOrder({ ...order, message: e.target.value });
              }}
            />
            <Grid container spacing={2}>
              {/* createdDate, createdBy, status in 1 row */}
              <Grid item sx={{ width: "100%" }} md={4}>
                <TextField
                  margin="dense"
                  name="createdDate"
                  label="Created Date"
                  fullWidth
                  value={order.createdDate || ""}
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
                  value={order.createdBy || ""}
                  disabled
                  sx={{ mr: 2 }}
                />
              </Grid>

              <Grid item sx={{ width: "100%", mt: 1 }} md={4}>
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
                    value={order.status}
                    disabled={
                      orderDetails.status === 3 || orderDetails.status === 2
                    }
                    onChange={(e) =>
                      setOrder((prevOrder) => ({
                        ...prevOrder,
                        status: e.target.value,
                      }))
                    }
                    sx={{
                      backgroundColor: `${orderStatus[order.status].color}`,
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

              <Grid item sx={{ width: "100%" }} md={6}>
                <TextField
                  margin="dense"
                  name="updatedDate"
                  label="Updated Date"
                  fullWidth
                  value={order.updatedDate || ""}
                  disabled
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }} md={6}>
                <TextField
                  margin="dense"
                  name="updatedBy"
                  label="Updated by"
                  fullWidth
                  value={order.updatedBy || ""}
                  disabled
                  sx={{ mr: 2 }}
                />
              </Grid>
            </Grid>
            {/* updatedDate, updatedBy, message */}

            <TextField
              margin="dense"
              name="note"
              label="Note"
              fullWidth
              value={order.note || ""}
              disabled={orderDetails.status === 3 || orderDetails.status === 2}
              onChange={(e) => setOrder({ ...order, note: e.target.value })}
            />
            <ProductTable products={order.items} />
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
            <Button
              onClick={() => {
                onClose();
                setOrder(null);
              }}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="warning"
              sx={{ color: "white" }}
              disabled={orderDetails.status === 3 || orderDetails.status === 2}
            >
              Update
            </Button>
          </DialogActions>
        </>
      )}
    </>
  );
};

const UpdateModal = ({ open, handleClose, order, refetch }) => {
  const { data: orderDetails, refetch: refetchOrder } = useQuery({
    queryKey: ["getOrderDetails", order.orderId],
    queryFn: () => orderAPI.getOrderDetails(order.accountId, order.orderId),
    enabled: !!order && open,
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <LoadingComp isLoading={!orderDetails} />
      {orderDetails && (
        <ModalContent
          orderDetails={orderDetails}
          onClose={handleClose}
          refetch={refetch}
          refetchOrder={refetchOrder}
        />
      )}
    </Dialog>
  );
};

export default UpdateModal;
