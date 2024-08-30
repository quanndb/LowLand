import axios from "src/services";

const productTypeAPI = {
  getProductTypes: (params) => {
    const url = "/productTypes";
    return axios.get(url, { params });
  },
};

export default productTypeAPI;
