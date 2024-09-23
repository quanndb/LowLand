import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { user } from "src/redux/selectors/UserSelector";

import MaterialChart from "../material-chart";
import TopSale from "../top-sale";
import Stuff from "../stuff";
import WebTraffic from "../web-traffic";
import AppRevenue from "../app-revenue";

export default function AppView() {
  const userData = useSelector(user);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome, {userData.fullName}
      </Typography>
      <Stuff />
      <AppRevenue />
      <WebTraffic />
      <TopSale />
      <MaterialChart />
    </Container>
  );
}
