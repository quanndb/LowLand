import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ConfirmDelete = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this?</Typography>
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
          <Button variant="contained" color="error" onClick={onDelete}>
            Yes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
