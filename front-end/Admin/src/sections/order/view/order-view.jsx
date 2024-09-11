import { useState } from "react";
import {
  Box,
  Pagination,
  Grid,
  Container,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import UpdateModal from "./updateModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "src/hooks/use-debounce";
import orderAPI from "src/services/API/orderAPI";

export default function OrderView() {
  const [status, setStatus] = useState(-1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const queryValue = useDebounce(query, 500);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    data: orderPages,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["order", { page, status, query: queryValue }],
    queryFn: () => orderAPI.getOrders({ page, status, query: queryValue }),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

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

  return (
    <Container>
      <Paper sx={{ padding: "25px", width: "100%" }}>
        <Grid container spacing={{ md: 3 }}>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"space-between"}
              sx={{ mb: 2 }}
              gap={2}
            >
              <Grid item md={4} xs={12}>
                <FormControl sx={{ minWidth: "200px", width: "100%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    label="Status"
                  >
                    <MenuItem value="-1">All</MenuItem>
                    <MenuItem value="0">Waiting</MenuItem>
                    <MenuItem value="1">Paid</MenuItem>
                    <MenuItem value="2">Delivered</MenuItem>
                    <MenuItem value="3">Canceled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12} sx={{ display: "flex" }}>
                <TextField
                  label="Search"
                  aria-label="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search orders..."
                  sx={{ width: "100%" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ height: "100%" }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ height: 667, width: "100%" }}>
              <DataGrid
                rows={orderPages?.response || []}
                getRowId={(row) => row.orderId}
                columns={[
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
                  {
                    field: "createdBy",
                    headerName: "Created by ",
                    width: 200,
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
                  setSelectedOrder(row.row);
                  setOpenModal(true);
                }}
                pageSizeOptions={[0]}
                hideFooter={true}
                loading={!orderPages || isFetching}
                disableRowSelectionOnClick
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={orderPages?.totalPages}
                page={page}
                onChange={(e, v) => setPage(v)}
                color="primary"
                sx={{ mt: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {selectedOrder && (
        <UpdateModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          order={selectedOrder}
          refetch={refetch}
        />
      )}
    </Container>
  );
}
