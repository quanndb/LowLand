import Grid from "@mui/material/Grid";

import { Skeleton } from "@mui/material";

import chartAPI from "src/services/API/chartAPI";

import AppWidgetSummary from "./app-widget-summary";
import {
  AddShoppingCart,
  AlignHorizontalRightOutlined,
  GridView,
  Person,
  WrapText,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

const Stuff = () => {
  const { data: stuffs } = useQuery({
    queryKey: ["getStuff"],
    queryFn: () => chartAPI.getStuff(),
  });

  return (
    <Grid
      container
      spacing={1}
      sx={{ my: 3, justifyContent: { xs: "center", lg: "space-between" } }}
    >
      {[
        {
          title: "Customers",
          total: stuffs?.customer,
          icon: <Person fontSize="large" />,
        },
        {
          title: "Orders in month",
          total: stuffs?.orderInMonth,
          icon: <AlignHorizontalRightOutlined fontSize="large" />,
        },
        {
          title: "Products",
          total: stuffs?.product,
          icon: <WrapText fontSize="large" />,
        },
        {
          title: "Product types",
          total: stuffs?.productType,
          icon: <AddShoppingCart fontSize="large" />,
        },
        {
          title: "Materials",
          total: stuffs?.material,
          icon: <GridView fontSize="large" />,
        },
      ].map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
          key={index}
          sx={{ width: { xs: "100%", md: "fit-content" } }}
        >
          {stuffs ? (
            <AppWidgetSummary
              title={item.title}
              total={item.total}
              icon={item.icon}
              color="primary"
            />
          ) : (
            <Skeleton variant="rounded" sx={{ height: 150 }} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Stuff;
