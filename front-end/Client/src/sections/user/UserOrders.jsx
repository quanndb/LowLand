import { useState } from "react";
import { useSelector } from "react-redux";

import Pagination from "@mui/material/Pagination";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

import orderAPI from "src/services/API/orderAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { user as userSelector } from "src/redux/selectors/UserSelector";
import InnerLoading from "src/components/InnerLoading";
import { useDebounce } from "src/hooks/use-debounce";
import SectionTitleB from "src/components/SectionTitleB";
import UpdateModal from "./UpdateModal";

const UserOrders = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState(-1);

  const [page, setPage] = useState(1);

  const user = useSelector(userSelector);

  const [open, setOpen] = useState(false);

  const [orderId, setOrderId] = useState(null);

  const debounceValue = useDebounce(search, 500);

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

  const {
    data: pageOrders,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", { page, status, query: debounceValue }],
    queryFn: () =>
      orderAPI.getMyOrders(user.accountId, {
        page,
        status,
        query: debounceValue,
      }),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <SectionTitleB>Orders</SectionTitleB>
        <FormControl
          sx={{
            mb: 2,
            width: { xs: "100%", md: "200px" },
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="-1">All</MenuItem>
            <MenuItem value="0">Waiting</MenuItem>
            <MenuItem value="1">Paid</MenuItem>
            <MenuItem value="2">Delivered</MenuItem>
            <MenuItem value="3">Canceled</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            height: "fit-content",
            width: { xs: "100%", md: "350px" },
          }}
        >
          <TextField
            label="Search your orders..."
            variant="outlined"
            sx={{ width: "100%", mr: "10px" }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Button
            startIcon={<SearchIcon />}
            variant="contained"
            sx={{ px: "20px" }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 667, width: "100%", position: "relative" }}>
        <InnerLoading isLoading={!pageOrders?.response || isFetching} />
        <DataGrid
          rows={isFetching ? [] : pageOrders?.response || []}
          getRowId={(row) => row.orderId}
          columns={[
            { field: "orderCode", headerName: "Order code", width: 100 },
            {
              field: "imageUrl",
              headerName: "Items",
              width: 90,
              renderCell: (params) => {
                return (
                  <Avatar
                    sx={{ mt: 1 }}
                    src={params.value || "/static/images/logo.jpg"}
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
            {
              field: "status",
              headerName: "Status",
              width: 100,
              renderCell: (param) => (
                <span
                  style={{
                    backgroundColor: orderStatus[param.row.status].color,
                    color: "white",
                    padding: "5px 5px",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {orderStatus[param.row.status].value}
                </span>
              ),
            },
            {
              field: "totalMoney",
              headerName: "Total",
              width: 120,
              type: "number",
            },
          ]}
          onRowClick={(row) => {
            setOrderId(row.id);
            setOpen(true);
          }}
          disableRowSelectionOnClick
          hideFooter={true}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pageOrders?.totalPages || 1}
          page={page}
          onChange={(e, v) => setPage(v)}
          color="primary"
          sx={{ mt: 2 }}
        />
      </Box>
      <UpdateModal
        open={open}
        handleClose={() => setOpen(false)}
        orderId={orderId}
        userId={user.accountId}
        refetch={refetch}
      />
    </>
  );
};

export default UserOrders;
