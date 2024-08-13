import { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Grid,
  Container,
  Button,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import orderAPI from "src/services/API/orderAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import UpdateModal from "./updateModal";
// import ProductCard from '../product-card';
// import ProductDetailModal from './ProductDetailModal';
// import AddProductModal from './AddProductModal';
// import { sp } from 'src/_mock/sp';

export default function OrderView() {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    orderAPI
      .getAll()
      .then((res) => setOrderList(res))
      .catch((error) => toast.error(error));
  }, []);
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
    totalMoney: `${order.totalMoney} VNĐ`,
  }));

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

  const handleUpdateOrder = (updatedOrder) => {
    orderAPI
      .manageOrder(updatedOrder)
      .then((res) => {
        toast.success("Update order successfully");
        setOrderList((prevOrderList) => {
          return prevOrderList.map((item) =>
            item.orderId === res.orderId ? { ...item, ...res } : item
          );
        });
      })
      .catch((error) => {
        toast.error(error.message || "Error updating order");
      });
  };

  return (
    <Container>
      <Paper sx={{ padding: "25px", width: "100%" }}>
        <Grid container spacing={{ md: 3 }}>
          <Grid item xs={12}>
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

      <UpdateModal
        open={openModal}
        handleClose={handleCloseModal}
        order={selectedOrder}
        updateOrder={handleUpdateOrder}
      />
    </Container>
  );
}
