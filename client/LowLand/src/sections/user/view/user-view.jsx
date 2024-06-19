import Pagination from "@mui/material/Pagination";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "src/routes/hooks";
import { useEffect, useRef, useState } from "react";
import { DataGrid, GridFooter } from "@mui/x-data-grid";
import CreateIcon from "@mui/icons-material/Create";
import SideLayout from "src/layouts/sideLayout";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const CustomizedBreadcrumbs = ({ sx, title }) => {
  const router = useRouter();
  function handleClick(event, href) {
    event.preventDefault();
    router.replace(href);
    console.log(event);
  }
  return (
    <Box role="presentation" sx={{ ...sx }}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          onClick={(e) => {
            handleClick(e, "/");
          }}
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Users" />
      </Breadcrumbs>
    </Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UserView = ({ user, orders }) => {
  // Khởi tạo state cho trạng thái và phân trang
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Hàm xử lý khi trang thay đổi
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Hàm xử lý khi trạng thái thay đổi
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  // Lọc dữ liệu theo trạng thái đã chọn
  const filteredOrders = status
    ? orders.filter((order) => order.status === status)
    : orders;

  // Tính toán dữ liệu cần hiển thị trên trang
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const handleChangeAvatar = (e) => {
    const input = e.target.files[0];

    input.preview = URL.createObjectURL(input);
    console.log(input.preview);
    setFile(input);
  };

  const handleUpdate = (e) => {
    console.log(fullName);
    console.log(email);
    console.log(phone);
    console.log(address);
  };
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <SideLayout title={"User profile"}>
      <Container disableGutters maxWidth={"100%"} sx={{ my: "50px" }}>
        <Box sx={{ pb: "40px" }}>
          <CustomizedBreadcrumbs />
        </Box>

        <Paper sx={{ padding: "25px", width: "100%", py: "100px" }}>
          <Grid container spacing={{ md: 3 }}>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  margin: "0 auto",
                }}
              >
                <Avatar
                  alt="avatar"
                  src={file ? file.preview : user.imageURL ? user.imageURL : ""}
                  sx={{ width: 180, height: 180, margin: "auto", mb: 3 }}
                />
                <IconButton
                  component={"label"}
                  sx={{
                    position: "absolute",
                    borderRadius: "50%",
                    bottom: "10px",
                    right: "15px",
                    backgroundColor: "var(--secondary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                      opacity: ".8",
                    },
                  }}
                >
                  <CreateIcon sx={{ color: "white" }} />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleChangeAvatar(e)}
                  />
                </IconButton>
              </Box>
              <TextField
                sx={{ m: 2, width: "100%" }}
                value={email ? email : user.email ? user.email : ""}
                label="Email"
                disabled
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                value={fullName ? fullName : user.fullName ? user.fullName : ""}
                label="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                label="Phone Number"
                value={phone ? phone : user.phoneNumber ? user.phoneNumber : ""}
                onChange={(e) => setPhone(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                label="Address"
                value={address ? address : user.address ? user.address : ""}
                onChange={(e) => setAddress(e.target.value)}
              ></TextField>
              <Button
                sx={{ width: "50%", my: 3 }}
                variant="contained"
                onClick={handleUpdate}
                disabled={!(fullName || email || address || phone || file)}
              >
                Cập nhật
              </Button>
            </Grid>
            <Grid item md={9} xs={12}>
              <FormControl sx={{ mb: 2, width: "100px" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Waiting">Waiting</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Canceled">Canceled</MenuItem>
                  <MenuItem value="Transfering">Transfering</MenuItem>
                </Select>

                <TextField></TextField>
              </FormControl>
              <Box sx={{ height: 632, width: "100%" }}>
                <DataGrid
                  rows={filteredOrders}
                  columns={[
                    { field: "id", headerName: "Order code", width: 90 },
                    {
                      field: "imageURL",
                      headerName: "Items",
                      width: 90,
                      renderCell: (params) => (
                        <Avatar
                          sx={{ mt: 1 }}
                          alt="avatar"
                          src={params.value}
                        />
                      ),
                    },
                    {
                      field: "customerName",
                      headerName: "Customer Name",
                      width: 150,
                    },
                    {
                      field: "orderDate",
                      headerName: "Order Date",
                      width: 150,
                    },
                    { field: "status", headerName: "Status", width: 110 },
                    {
                      field: "total",
                      headerName: "Total",
                      width: 120,
                      type: "number",
                    },
                  ]}
                  autoHeight
                  pageSize={itemsPerPage}
                  pageSizeOptions={[5, 10]}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10, page: 0 },
                    },
                  }}
                  // components={{
                  //   footer: () => (
                  //     <GridFooter>
                  //       <Pagination
                  //         count={Math.ceil(filteredOrders.length / itemsPerPage)}
                  //         page={page}
                  //         onChange={handlePageChange}
                  //         sx={{
                  //           mt: 4,
                  //           display: "flex",
                  //           justifyContent: "center",
                  //         }}
                  //       />
                  //     </GridFooter>
                  //   ),
                  // }}
                  disableSelectionOnClick
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </SideLayout>
  );
};
export default UserView;
