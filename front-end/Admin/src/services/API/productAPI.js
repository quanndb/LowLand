import axios from "src/services";

const productAPI = {
  getProducts: (params) => {
    const url = "/products";
    return axios.get(url, { params });
  },
  getById: (params) => {
    const url = "/products/" + params;
    return axios.get(url);
  },
  add: (params) => {
    const url = "/products";
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: (productId, params) => {
    const url = `/products/${productId}`;
    return axios.put(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getDetails: (params) => {
    const url = "/ProductDetail/GetAllByProductId?ProductId=" + params;
    return axios.get(url, params);
  },

  deleteProductImage: (productId, productImageId) => {
    const url = `/products/${productId}/images/${productImageId}`;
    return axios.delete(url);
  },
  deleteDetails: (productId, detailsId) => {
    const url = `products/${productId}/sizesAndPrices/${detailsId}`;
    return axios.delete(url);
  },
};

export default productAPI;
