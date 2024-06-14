import { Box, Container, Paper, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import SideLayout from "src/layouts/sideLayout";

const CheckoutView = () => {
  console.log("123");
  return (
    <SideLayout title="Checkout">
      <Container maxWidth="lg" disableGutters>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", color: "#ee4d2d" }}>
            <RoomIcon sx={{ mr: 1 }} />
            <Typography sx={{ fontWeight: "600" }}>Delivery Address</Typography>
          </Box>
          <Box sx={{ mt: 1, display: "flex" }}>
            <Typography sx={{ fontWeight: "600", mr: 3 }}>
              Vu Minh Quan <span> (+84) 123456789</span>
            </Typography>
            <Typography>
              Số 46, 35/41, Đường Tu Hoàng, Phường Phương Canh, Quận Nam Từ
              Liêm, Hà Nội
            </Typography>
          </Box>
        </Paper>
      </Container>
    </SideLayout>
  );
};

export default CheckoutView;
