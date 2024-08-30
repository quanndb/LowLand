import axios from "src/services";

const productSizeAPI = {
  getSizes: (params) => {
    const url = "/productSizes";
    return axios.get(url, { params });
  },
};

export default productSizeAPI;
