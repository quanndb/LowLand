import ApexChart from 'react-apexcharts';
import Chart, { useChart } from "src/components/chart";

const MaterialColumnChart = ({ materials }) => {
  const chartOptions = useChart({
    chart: {
      type: 'bar',
    },
    series: [
      {
        name: 'Quantity',
        data: materials.map(material => material.quantity),
      },
      {
        name: 'Min Quantity',
        data: materials.map(material => material.minQuantity),
      },
    ],
    xaxis: {
      categories: materials.map(material => material.materialName),
    },
  });

  return <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={400} />;
};

export default MaterialColumnChart;
