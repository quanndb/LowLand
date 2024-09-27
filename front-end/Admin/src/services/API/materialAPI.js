import { update } from "lodash";
import axios from "src/services";

const materialAPI = {
  getMaterials: (params) => {
    const url = "/materials";
    return axios.get(url, { params });
  },
  update: (id, params) => {
    const url = "/materials" + "/" + id;
    return axios.put(url, params);
  },
};

export default materialAPI;
