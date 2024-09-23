import axios from "src/services";

const cagetoryAPI = {
  getCagetories: (params) => {
    const url = "/categories";
    return axios.get(url, params);
  },
};

export default cagetoryAPI;
