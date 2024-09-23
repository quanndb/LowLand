import { Box } from "@mui/material";

import chartAPI from "src/services/API/chartAPI";

import { useQuery } from "@tanstack/react-query";
import AppWebsiteVisits from "./app-website-visits";

const TopSale = () => {
  const { data: topSale } = useQuery({
    queryKey: ["getTopSale", { top: 10 }],
    queryFn: () => chartAPI.getTopSale({ topProduct: 10 }),
  });
  return (
    <Box sx={{ mt: 3 }}>
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
  );
};

export default TopSale;
