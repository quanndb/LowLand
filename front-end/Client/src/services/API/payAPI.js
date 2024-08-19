import axios from "src/services";

const payAPI = {
  createPaymentLink: (params) => {
    const url = "/payments?orderId=" + params;
    return axios.post(url);
  },
  cancel: (params) => {
    const url = "/payments/cancel-payment";
    return axios.post(url, params);
  },
};

export default payAPI;
