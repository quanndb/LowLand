import Typography from "@mui/material/Typography";

import {
  Box,
  Button,
  Card,
  Pagination,
  Skeleton,
  TextField,
} from "@mui/material";

import chartAPI from "src/services/API/chartAPI";

import MaterialColumnChart from "./customChart";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "src/hooks/use-debounce";

const MaterialChart = () => {
  const [pageMaterial, setPageMaterial] = useState(1);
  const [query, setQuery] = useState("");
  const queryValue = useDebounce(query, 500);

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
  );
};

export default MaterialChart;
