import { update } from "lodash";
import axios from "src/services";

const materialAPI = {
  getMaterials: (params) => {
    const url = "/materials";
    return axios.get(url, { params });
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
