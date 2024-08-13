import { update } from "lodash";
import axios from "src/services";

const sizeAPI = {
  getAll: () => {
    const url = "/ProductSize/GetAll?keyWords=";
    return axios.get(url);
  },
  update: (params) => {
    const url = "/ProductSize/CreateOrUpdate";
    return axios.post(url, params);
  },
  delete: (id) => {
    const url = `/ProductSize/Delete?id=${id}`;
    return axios.get(url);
  },
};

export default sizeAPI;
