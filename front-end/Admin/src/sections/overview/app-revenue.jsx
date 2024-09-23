import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box, Skeleton, Stack } from "@mui/material";

import chartAPI from "src/services/API/chartAPI";

import ChartTotalMoney from "./ChartTotalMoney";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Revenue = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

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
  return (
    <Stack>
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
                {
                  name: "Orders",
                  type: "column",
                  fill: "solid",
                  data: totalMoneyInMonth?.map((item) => item.totalOrders || 0),
                },
              ],
            }}
          />
        ) : (
          <Skeleton variant="rounded" width="100%" height={300} />
        )}
      </Box>
    </Stack>
  );
};

export default Revenue;
