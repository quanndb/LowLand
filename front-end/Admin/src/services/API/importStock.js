import { update } from "lodash";
import axios from "src/services";

const importStockAPI = {
  getAll: () => {
    const url = "/ImportStock/GetAll";
    return axios.get(url);
  },
  getById:(id) => {
    const url = `/ImportStock/GetById?Id=${id}`;
    return axios.get(url);
  },
  update: (params) => {
    const url = "/ImportStock/CreateOrUpdate";
    return axios.post(url, params);
  },
  delete: (id) => {
    const url = `/ImportStock/Delete?Id=${id}`;
    return axios.get(url);
  },
};

export default importStockAPI;
