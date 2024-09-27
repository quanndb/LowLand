import { Container, Typography } from "@mui/material";
import MaterialChart from "src/sections/overview/material-chart";
import ImportStock from "../import-stock";

export default function MaterialView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Material
      </Typography>
      <MaterialChart />
      <ImportStock />
    </Container>
  );
}
