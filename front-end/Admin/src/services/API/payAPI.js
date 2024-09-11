import axios from "src/services";

const payAPI = {
  createPaymentLink: (params) => {
    const url = "payments?orderId=" + params;
    return axios.post(url);
  },
  cancel: (accountId, orderId) => {
    const url = `/accounts/${accountId}/orders/${orderId}`;
    return axios.delete(url, params);
  },
};

export default payAPI;
