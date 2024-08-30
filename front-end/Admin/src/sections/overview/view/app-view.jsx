import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
  Box,
  Button,
  Card,
  Pagination,
  Skeleton,
  TextField,
} from "@mui/material";

import { user } from "src/redux/selectors/UserSelector";
import chartAPI from "src/services/API/chartAPI";

import ChartTotalMoney from "../ChartTotalMoney";
import AppWebsiteVisits from "../app-website-visits";
import MaterialColumnChart from "../customChart";
import AppWidgetSummary from "../app-widget-summary";
import {
  AddShoppingCart,
  AlignHorizontalRightOutlined,
  GridView,
  Person,
  WrapText,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "src/hooks/use-debounce";

export default function AppView() {
  const userData = useSelector(user);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [pageMaterial, setPageMaterial] = useState(1);
  const [query, setQuery] = useState("");

  const queryValue = useDebounce(query, 500);

  const handleMonthChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 12) {
      setMonth(value);
    }
  };

  const handleYearChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1900 && value <= 2100) {
      setYear(value);
    }
  };

  const { data: totalMoneyInMonth } = useQuery({
    queryKey: ["getTotalMoneyInMonth", { monthInput: month, yearInput: year }],
    queryFn: () =>
      chartAPI.getTotalMoneyInMonth({ monthInput: month, yearInput: year }),
  });

  const { data: stuffs } = useQuery({
    queryKey: ["getStuff"],
    queryFn: () => chartAPI.getStuff(),
  });

  const { data: topSale } = useQuery({
    queryKey: ["getTopSale", { top: 10 }],
    queryFn: () => chartAPI.getTopSale({ topProduct: 10 }),
  });

  const { data: materialsPage } = useQuery({
    queryKey: [
      "getMaterial",
      { page: pageMaterial, size: 10, query: queryValue },
    ],
    queryFn: () =>
      chartAPI.getMaterialChart({
        page: pageMaterial,
        size: 10,
        query: queryValue,
      }),
  });

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome, {userData.fullName}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 5 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
            {[...Array(12).keys()].map((index) => (
              <MenuItem key={index + 1} value={(index + 1).toString()}>
                {(index + 1).toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            {Array.from({ length: 3 }, (_, index) => {
              const currentYear = new Date().getFullYear();
              const yearValue = currentYear - index;
              return (
                <MenuItem key={yearValue} value={yearValue.toString()}>
                  {yearValue.toString()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Box>
        {totalMoneyInMonth ? (
          <ChartTotalMoney
            title="Monthly Revenue"
            subheader="Daily Revenue for the Month"
            chart={{
              labels: totalMoneyInMonth?.map((item) =>
                item.dayInMonth ? item.dayInMonth.toString() : "N/A"
              ),
              series: [
                {
                  name: "Revenue",
                  type: "column",
                  fill: "solid",
                  data: totalMoneyInMonth?.map((item) => item.totalMoney || 0),
                },
              ],
            }}
          />
        ) : (
          <Skeleton variant="rounded" width="100%" height={300} />
        )}
      </Box>

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

      <Box>
        {topSale && (
          <AppWebsiteVisits
            title="Top Best-Selling Product"
            chart={{
              labels: topSale.map((item) => item.productName || "N/A"),
              series: [
                {
                  name: "Total",
                  type: "column",
                  fill: "solid",
                  data: topSale.map((item) => item.quantity || 0),
                },
              ],
            }}
          />
        )}
      </Box>

      <Box sx={{ my: 3 }}>
        <Card>
          <Typography variant="h5" sx={{ my: 3, mx: 3 }}>
            Materials
          </Typography>
          <Box sx={{ mx: 3 }}>
            <TextField
              placeholder="Search material..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ height: "100%", py: 2 }}
              color="secondary"
            >
              Search
            </Button>
          </Box>
          {materialsPage ? (
            <>
              <MaterialColumnChart
                chart={{
                  labels: materialsPage.response.map(
                    (item) =>
                      item.materialName + " (" + item.unitName + ")" || "N/A"
                  ),
                  series: [
                    {
                      name: "Current",
                      type: "column",
                      fill: "solid",
                      data: materialsPage.response.map(
                        (item) => item.quantity || 0
                      ),
                    },
                    {
                      name: "Minimum",
                      type: "column",
                      fill: "solid",
                      data: materialsPage.response.map(
                        (item) => item.minQuantity || 0
                      ),
                    },
                  ],
                }}
              />
              <Pagination
                count={materialsPage.totalPages}
                page={pageMaterial}
                onChange={(e, v) => setPageMaterial(v)}
                color="primary"
                sx={{ my: 2, justifyContent: "center", display: "flex" }}
              />
            </>
          ) : (
            <Skeleton variant="rounded" height={300} sx={{ my: 3, mx: 3 }} />
          )}
        </Card>
      </Box>
    </Container>
  );
}
