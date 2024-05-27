
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Avatar, Box, Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "src/routes/hooks";
import { useState } from 'react';

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
  function handleClick(event) {
    event.preventDefault();
    console.log(event);
  }
  return (
    <Box role="presentation" onClick={handleClick} sx={{ ...sx }}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Users" />
        <StyledBreadcrumb
          component="a"
          href="#"
          sx={{ maxWidth: "150px" }}
          label={title}
        />
      </Breadcrumbs>
    </Box>
  );
};

const UserView = ({ user, orders }) => {
  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate orders to display based on the current page
  const paginatedOrders = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (

    <Container>
      <Box sx={{ p: "20px" }}>
        <CustomizedBreadcrumbs sx={{ mb: "40px" }} title={user.fullname} />
      </Box>



      <Grid container >

        <Grid item md={4} xs={12} sx={{ textAlign: "center" }}>
          <Avatar
            alt="avatar"
            src={user.avatar}
            sx={{ width: 180, height: 180, margin: "auto" }}
          />

          <Typography sx={{ mt: 4 }}>
            {user.fullname}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {user.email}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {user.phone}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {user.address}
          </Typography>
        </Grid>

        <Grid item md={8} xs={12}>
          {paginatedOrders.map((item) => (
            <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
              <Typography variant="h6">Order ID: {item.id}</Typography>
              <Typography>Customer Name: {item.customerName}</Typography>
              <Typography>Phone: {item.phone}</Typography>
              <Typography>Order Date: {item.orderDate}</Typography>
              <Typography>Status: {item.status}</Typography>
              <Typography>Address: {item.address}</Typography>
              <Typography>Total: ${item.total.toLocaleString()}</Typography>
            </Box>
          ))}
          <Pagination
            count={Math.ceil(orders.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default UserView;
