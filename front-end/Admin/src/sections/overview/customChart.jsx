import ApexChart from "react-apexcharts";
import Chart, { useChart } from "src/components/chart";

const MaterialColumnChart = ({ title, subheader, chart, ...other }) => {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "30%",
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
        formatter: (value) => {
          if (typeof value !== "undefined") {
            return `${value.toLocaleString()}`;
          }
          return value;
        },
      },
    },
  });

  return (
    <Chart
      dir="ltr"
      type="line"
      series={series}
      options={chartOptions}
      width="100%"
      height={364}
    />
  );
};

export default MaterialColumnChart;
