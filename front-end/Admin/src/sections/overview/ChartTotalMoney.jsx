import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Chart, { useChart } from "src/components/chart";

export default function ChartTotalMoney({
  title,
  subheader,
  chart,
  unit,
  ...other
}) {
  const { labels, colors, series, options } = chart;

  const units = ["VNĐ", "orders"]; // Adjust units for each series as needed

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: "text",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          if (typeof value !== "undefined") {
            // Apply the correct unit for each series based on the seriesIndex
            return `${value.toLocaleString()} ${
              unit ? unit : units[seriesIndex]
            }`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  // Tính tổng các giá trị trong series
  const totalValue = series.reduce((total, seriesItem) => {
    const sum = seriesItem.data.reduce((sum, dataItem) => sum + dataItem, 0);
    return total + sum;
  }, 0);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={`${subheader}`}
        action={
          <Box component="span" sx={{ fontWeight: "bold" }}>
            Total : {totalValue.toLocaleString()} {unit ? unit : "VNĐ"}
          </Box>
        }
      />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

ChartTotalMoney.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
