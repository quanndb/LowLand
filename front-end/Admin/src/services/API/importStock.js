import { update } from "lodash";
import axios from "src/services";

const importStockAPI = {
  getImports: (params) => {
    const url = "/importStocks";
    return axios.get(url, { params });
  },
  getDetails: (id) => {
    const url = `/importStocks/${id}`;
    return axios.get(url);
  },
  update: (id, data) => {
    const url = "/importStocks" + "/" + id;
    return axios.put(url, data);
  },
  create: (params) => {
    const url = "/importStocks";
    return axios.post(url, params);
  },
};

export default importStockAPI;
