import { update } from "lodash";
import axios from "src/services";

const materialAPI = {
  getAll: () => {
    const url = "/Material/GetAll?keyWords=";
    return axios.get(url);
  },
  update: (params) => {
    const url = "/Material/CreateOrUpdate";
    return axios.post(url, params);
  },
  delete: (id) => {
    const url = `/Material/Delete?Id=${id}`;
    return axios.get(url);
  },
};

export default materialAPI;
