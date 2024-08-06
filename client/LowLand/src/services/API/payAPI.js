import axios from "src/services";

const payAPI = {
  createPaymentLink: (params) => {
    const url = "/pay/create-payment-link?orderId=" + params;
    return axios.post(url);
  },
  cancel: (params) => {
    const url = "/pay/cancel-payment";
    return axios.post(url, params);
  },
};

export default payAPI;
