import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ConfirmOut = ({ open, onClose, onOut }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Out</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to get out? Your data will be lost.
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            No
          </Button>
          <Button variant="contained" color="warning" onClick={onOut}>
            Yes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOut;
