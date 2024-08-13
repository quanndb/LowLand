import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { user } from "src/redux/selectors/UserSelector";
import chartAPI from "src/services/API/chartAPI";
import materialAPI from "src/services/API/materialAPI";
import accountAPI from "src/services/API/accountsAPI";
import orderAPI from "src/services/API/orderAPI";
import sizeAPI from "src/services/API/sizeAPI";

import ChartLowSelling from "../ChartLowSelling";
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

export default function AppView() {
  const userData = useSelector(user);

  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2024);

  const [data, setData] = useState([]);
  const [dataChart2, setDataForChart2] = useState([]);
  const [dataChart3, setDataForChart3] = useState([]);

  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    materialAPI
      .getAll()
      .then((res) => {
        setMaterials(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    orderAPI
      .getAll()
      .then((res) => setOrderList(res))
      .catch((error) => toast.error(error));
  }, []);

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    accountAPI
      .getAlls()
      .then((res) => {
        setAccounts(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    sizeAPI
      .getAll()
      .then((res) => {
        setSizes(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);
  const fetchTotalMoneyData = (month, year) => {
    chartAPI
      .getToltalMoneyDayinMonth(month, year)
      .then((res) => {
        if (res) {
          setData(res);
        } else {
          toast.error("Unexpected response format for total money data");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to fetch total money data");
      });
  };

  useEffect(() => {
    fetchTotalMoneyData(month, year);
  }, [month, year]);

  useEffect(() => {
    chartAPI
      .getTopBestSaleProduct(5)
      .then((res) => {
        if (res) {
          setDataForChart2(res);
        } else {
          toast.error("Unexpected response format for top best sale products");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to fetch top best sale products");
      });
  }, []);

  useEffect(() => {
    chartAPI
      .getTopLowSaleProduct(5)
      .then((res) => {
        if (res) {
          setDataForChart3(res);
        } else {
          toast.error("Unexpected response format for top low sale products");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to fetch top low sale products");
      });
  }, []);

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

      <Grid item xs={12} md={12} lg={12}>
        <ChartTotalMoney
          title="Monthly Revenue"
          subheader="Daily Revenue for the Month"
          chart={{
            labels: data.map((item) =>
              item.dayInMonth ? item.dayInMonth.toString() : "N/A"
            ),
            series: [
              {
                name: "Revenue",
                type: "column",
                fill: "solid",
                data: data.map((item) => item.totalMoney || 0),
              },
            ],
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ my: 3, display: "flex", justifyContent: "space-between" }}
      >
        <AppWidgetSummary
          title="Accounts"
          total={accounts.length}
          icon={<Person fontSize="large" />}
          color="primary"
        />
        <AppWidgetSummary
          title="Materials"
          total={materials.length}
          icon={<AlignHorizontalRightOutlined fontSize="large" />}
          color="primary"
        />

        <AppWidgetSummary
          title="Sizes"
          total={sizes.length}
          icon={<WrapText fontSize="large" />}
          color="primary"
        />

        <AppWidgetSummary
          title="Materials"
          total={orderList.length}
          icon={<AddShoppingCart fontSize="large" />}
          color="primary"
        />
        <AppWidgetSummary
          title="Blog"
          // total={materials.length}
          total={203}
          icon={<GridView fontSize="large" />}
          color="primary"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Materials
        </Typography>
        <MaterialColumnChart materials={materials} />
      </Grid>

      <Grid item xs={12} md={6}>
        <AppWebsiteVisits
          title="Top Best-Selling Product"
          chart={{
            labels: dataChart2.map((item) => item.productName || "N/A"),
            series: [
              {
                name: "Total",
                type: "column",
                fill: "solid",
                data: dataChart2.map((item) => item.quantity || 0),
              },
            ],
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <ChartLowSelling
          title="Top Low-Selling Product"
          chart={{
            labels: dataChart3.map((item) => item.productName || "N/A"),
            series: [
              {
                name: "Revenue",
                type: "column",
                fill: "solid",
                data: dataChart3.map((item) => item.quantity || 0),
              },
            ],
          }}
        />
      </Grid>
    </Container>
  );
}
