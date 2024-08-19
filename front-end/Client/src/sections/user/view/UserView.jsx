import { Container, Grid, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import SideLayout from "src/layouts/sideLayout";

import UserInfo from "../UserInfo";
import UserOrders from "../UserOrders";

import {
  BreadcrumItem,
  CustomizedBreadcrumbs,
} from "src/components/CustomBreadcum";

const UserView = () => {
  return (
    <SideLayout title={"User profile"}>
      <Container disableGutters maxWidth={"100%"} sx={{ my: "50px" }}>
        <CustomizedBreadcrumbs sx={{ mb: "30px" }}>
          <BreadcrumItem href="/" label="Home" icon={<HomeIcon />} />
          <BreadcrumItem href="#" label="User" />
        </CustomizedBreadcrumbs>

        <Paper sx={{ px: "25px", width: "100%", py: "50px" }}>
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
              <UserInfo />
            </Grid>

            <Grid item md={9} xs={12}>
              <UserOrders />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </SideLayout>
  );
};

export default UserView;
