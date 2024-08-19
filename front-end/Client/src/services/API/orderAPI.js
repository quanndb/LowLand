import axios from "src/services";

const orderAPI = {
  createOrder: (accountId, params) => {
    const url = `/accounts/${accountId}/orders`;
    return axios.post(url, params);
  },
  cancelOrder: (accountId, orderId, params) => {
    const url = `/accounts/${accountId}/orders/${orderId}/cancel`;
    return axios.put(url, params);
  },
  updateOrder: (accountId, orderId, params) => {
    const url = `/accounts/${accountId}/orders/${orderId}`;
    return axios.put(url, params);
  },
  getMyOrders: (accountId, params) => {
    const url = `/accounts/${accountId}/orders`;
    return axios.get(url, { params });
  },
  getOrderDetails: (accountId, orderId) => {
    const url = `/accounts/${accountId}/orders/${orderId}`;
    return axios.get(url);
  },
};

export default orderAPI;
