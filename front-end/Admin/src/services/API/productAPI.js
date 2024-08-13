import axios from "src/services";

const productAPI = {
  getAll: () => {
    const url = "/Product/GetAll?ProductId=0&inputRow=0";
    return axios.get(url);
  },
  getById: (params) => {
    const url = "/Product?ProductId=" + params;
    return axios.get(url, params);
  },
  update: (params) => {
    const url = "/Product/CreateOrUpdate";
    return axios.post(url, params);
  },
  delete: (params) => {
    const url = "/Product/Delete?id=" + params;
    return axios.get(url, params);
  },
  getDetails: (params) => {
    const url = "/ProductDetail/GetAllByProductId?ProductId=" + params;
    return axios.get(url, params);
  },
};

export default productAPI;
