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
  Stack,
  TextField,
} from "@mui/material";

import chartAPI from "src/services/API/chartAPI";

import ChartTotalMoney from "./ChartTotalMoney";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "src/hooks/use-debounce";

const WebTraffic = () => {
  const [monthAccess, setMonthAccess] = useState(new Date().getMonth() + 1);
  const [yearAccess, setYearAccess] = useState(new Date().getFullYear());

  const [accessQuery, setAccessQuery] = useState("");
  const [page, setPage] = useState(1);

  const queryAccessValue = useDebounce(accessQuery, 500);
  const { data: accessHistoriesPage } = useQuery({
    queryKey: [
      "getAccessHistories",
      { month: monthAccess, year: yearAccess, query: queryAccessValue, page },
    ],
    queryFn: () =>
      chartAPI.getAccessHistories({
        page: page,
        query: queryAccessValue,
        month: monthAccess === -1 ? null : monthAccess,
        year: yearAccess,
      }),
  });

  const { data: totalAccessHistories } = useQuery({
    queryKey: [
      "getTotalAccessInMonthOrYear",
      { month: monthAccess, year: yearAccess },
    ],
    queryFn: () =>
      chartAPI.getTotalAccessInMonthOrYear({
        month: monthAccess === -1 ? null : monthAccess,
        year: yearAccess,
      }),
  });
  return (
    <Stack sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 5 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={monthAccess}
            onChange={(e) => setMonthAccess(e.target.value)}
          >
            <MenuItem key={"unset"} value={-1}>
              Unset
            </MenuItem>
            {[...Array(12).keys()].map((index) => (
              <MenuItem key={index + 1} value={(index + 1).toString()}>
                {(index + 1).toString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={yearAccess}
            onChange={(e) => setYearAccess(e.target.value)}
          >
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
        {totalAccessHistories ? (
          <ChartTotalMoney
            title="Web traffic"
            subheader="Daily Web traffic for the Month or the Year"
            unit="visitors"
            chart={{
              labels: totalAccessHistories.map((item) =>
                item.date ? item.date.toString() : "N/A"
              ),
              series: [
                {
                  name: "Total",
                  type: "column",
                  fill: "solid",
                  data: totalAccessHistories?.map((item) => item.total || 0),
                },
              ],
            }}
          />
        ) : (
          <Skeleton variant="rounded" width="100%" height={300} />
        )}
      </Box>

      <Card
        sx={{
          p: 2,
          mt: 1,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search access"
            value={accessQuery}
            onChange={(e) => setAccessQuery(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ height: "100%", py: 2 }}
            color="secondary"
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {accessHistoriesPage ? (
            <>
              {accessHistoriesPage.response.map((item) => {
                return (
                  <Card key={item.id} raised sx={{ my: 1, p: 2 }}>
                    <Typography>
                      {" "}
                      {new Date(item.date).toDateString() +
                        " " +
                        new Date(item.date).toLocaleTimeString()}
                    </Typography>
                    <Typography color={"error"}>{item.user}</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      IP: {item.ip}
                    </Typography>
                    <Typography sx={{ maxWidth: "200px" }}>
                      {item.userAgent}
                    </Typography>
                  </Card>
                );
              })}
            </>
          ) : (
            [...Array(6).keys()].map((index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={200}
                height={300}
              />
            ))
          )}
        </Box>

        <Pagination
          count={accessHistoriesPage?.totalPages || 1}
          page={page}
          onChange={(e, v) => setPage(v)}
          color="primary"
          sx={{ my: 2, justifyContent: "center", display: "flex" }}
        />
      </Card>
    </Stack>
  );
};

export default WebTraffic;
