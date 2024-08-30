import axios from "src/services";

const chartAPI = {
  getTotalMoneyInMonth: (params) => {
    const url = `/charts/totalMoneyInMonth`;
    return axios.get(url, { params });
  },
  getStuff: () => {
    const url = `/charts/totalStuff`;
    return axios.get(url);
  },

  getTopSale: (params) => {
    const url = `/charts/topSale`;
    return axios.get(url, { params });
  },

  getMaterialChart: (params) => {
    const url = `/charts/materialsChart`;
    return axios.get(url, { params });
  },
};

export default chartAPI;
