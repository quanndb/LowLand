import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { user as userSelector } from "src/redux/selectors/UserSelector";
import CartManagerSlice from "src/redux/slices/CartManagerSlice";

import { formatPrice } from "src/utils/format-number";
import orderAPI from "src/services/API/orderAPI";
import { useMutation } from "@tanstack/react-query";
import LoadingComp from "src/components/LoadingComp";

const OrderForm = ({ data, setOpen, userData, setOrderId, setAttempt }) => {
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

  const user = useSelector(userSelector);

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
    return caculateSubtotal() * 0.1;
  };

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ["createOrder", { userId: user.accountId }],
    mutationFn: (params) => orderAPI.createOrder(user.accountId, params),
  });

  const handleOrder = () => {
    if (
      !userData?.customerName ||
      !userData?.phoneNumber ||
      !userData?.address
    ) {
      setAttempt(true);
      toast.error("Please enter receiver's information");
      return;
    }
    createOrder(order, {
      onSuccess: (res) => {
        setOrderId(res);
        toast.success("Create your order successfully");
        dispatch(CartManagerSlice.actions.clearCart());
        setOpen(true);
      },
    });
  };

  return (
    <>
      <LoadingComp isLoading={isPending}>
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
                onChange={(e) =>
                  setOrder({ ...order, message: e.target.value })
                }
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
              <Typography sx={{ fontSize: "20px", mr: 3 }}>
                Tax (10%)
              </Typography>
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
      </LoadingComp>
    </>
  );
};

export default OrderForm;
