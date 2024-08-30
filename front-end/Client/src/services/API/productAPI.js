import axios from "src/services";

const productAPI = {
  getProducts: (params) => {
    const url = "/products";
    return axios.get(url, { params });
  },
  getProductDetails: (params) => {
    const url = "/products/" + params;
    return axios.get(url, params);
  },
  getProductTypes: (params) => {
    const url = "/productTypes?query=" + params;
    return axios.get(url);
  },
};

export default productAPI;
