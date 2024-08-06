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
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CreateIcon from "@mui/icons-material/Create";
import SideLayout from "src/layouts/sideLayout";
import UpdateModal from "./updateModal";
import accountAPI from "src/services/API/accountAPI";
import { useDispatch } from "react-redux";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { toast } from "react-toastify";
import orderAPI from "src/services/API/orderAPI";

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
  const [orderList, setOrderList] = useState(orders);
  useEffect(() => {
    if (orders !== null && orders !== undefined) {
      setOrderList(orders);
    }
  }, [orders]);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const statusMap = {
    0: "Waiting",
    1: "Paid",
    2: "Delivered",
    3: "Canceled",
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };
  let filteredOrders = orderList
    ? status !== ""
      ? orderList.filter((order) => order.status === parseInt(status))
      : orderList
    : [];

  let paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  let ordersWithId = paginatedOrders.map((order, index) => ({
    ...order,
    id: index + 1 + (page - 1) * itemsPerPage,
    status: statusMap[order.status],
    totalMoney: `${order.totalMoney.toLocaleString()} VNĐ`,
  }));

  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClickRow = (params) => {
    setSelectedOrder(params.row.orderId);
    // console.log(params.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleChangeAvatar = (e) => {
    const input = e.target.files[0];
    input.preview = URL.createObjectURL(input);
    setFile(input);
  };

  const handleUpdateOrder = (updatedOrder) => {
    orderAPI
      .updateOrder(updatedOrder)
      .then((res) => {
        toast.success("Update order successfully");
        setOrderList((prevOrderList) => {
          if (!Array.isArray(prevOrderList)) {
            return [];
          }
          return prevOrderList.map((item) =>
            item.orderId === res.orderId ? { ...item, ...res } : item
          );
        });
      })
      .catch((error) => {
        toast.error(error.message || "Error updating order");
      });
  };

  const handleUpdate = () => {
    accountAPI
      .update({
        fullName: fullName,
        phoneNumber: phone,
        address: address,
        // imageURL: file ? file.preview : user.imageURL,
      })
      .then((res) => {
        dispatch(UserManagerSlice.actions.updateUser(res));
        toast.success("Update successfully");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {});
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
                value={email}
                label="Email"
                disabled
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                value={fullName}
                label="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "100%" }}
                label="Address"
                value={address}
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
                  <MenuItem value="0">Waiting</MenuItem>
                  <MenuItem value="1">Paid</MenuItem>
                  <MenuItem value="2">Delivered</MenuItem>
                  <MenuItem value="3">Canceled</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ height: 667, width: "100%" }}>
                <DataGrid
                  rows={ordersWithId}
                  columns={[
                    { field: "id", headerName: "STT", width: 10 },
                    { field: "orderCode", headerName: "Order code", width: 90 },
                    {
                      field: "imageUrl",
                      headerName: "Items",
                      width: 90,
                      renderCell: (params) => {
                        return (
                          <Avatar
                            sx={{ mt: 1 }}
                            alt="avatar"
                            src={params.value}
                          />
                        );
                      },
                    },
                    {
                      field: "productName",
                      headerName: "Product Name",
                      width: 150,
                    },
                    {
                      field: "quantity",
                      headerName: "Quantity",
                      width: 85,
                    },
                    {
                      field: "customerName",
                      headerName: "Customer Name",
                      width: 150,
                    },
                    {
                      field: "phoneNumber",
                      headerName: "phone Number",
                      width: 150,
                    },
                    {
                      field: "address",
                      headerName: "Address ",
                      width: 150,
                    },
                    {
                      field: "createdDate",
                      headerName: "Created Date ",
                      width: 170,
                    },
                    { field: "status", headerName: "Status", width: 90 },
                    {
                      field: "totalMoney",
                      headerName: "Total",
                      width: 120,
                      type: "number",
                    },
                  ]}
                  onRowClick={handleClickRow}
                  disableTooltip
                  pageSizeOptions={[0]}
                  disableRowSelectionOnClick
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(filteredOrders.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <UpdateModal
        open={openModal}
        handleClose={handleCloseModal}
        order={selectedOrder}
        updateOrder={handleUpdateOrder}
      />
    </SideLayout>
  );
};

export default UserView;
