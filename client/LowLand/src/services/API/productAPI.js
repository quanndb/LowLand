import axios from "src/services";

const productAPI = {
  getAll: (params) => {
    const url =
      "/Product/GetAll?ProductId=" +
      params["productId"] +
      "&inputRow=" +
      params["inputRow"];
    return axios.get(url, params);
  },
  getProductDetails: (params) => {
    const url = "/ProductDetail/GetAllByProductId?ProductId=" + params;
    return axios.get(url, params);
  },
};

export default productAPI;
