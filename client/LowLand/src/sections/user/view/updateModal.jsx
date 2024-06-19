import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const UpdateModal = ({ open, handleClose, order, handleUpdate }) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (order) {
      setUpdatedOrder({
        customerName: order.customerName,
        phoneNumber: order.phoneNumber,
        address: order.address,
      });
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
    handleUpdate(updatedOrder);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="customerName"
          label="Customer Name"
          fullWidth
          value={updatedOrder.customerName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          fullWidth
          value={updatedOrder.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          fullWidth
          value={updatedOrder.address}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
