import { update } from "lodash";
import axios from "src/services";

const unitAPI = {
  getUnits: (params) => {
    const url = "/units";
    return axios.get(url, { params });
  },
};

export default unitAPI;
