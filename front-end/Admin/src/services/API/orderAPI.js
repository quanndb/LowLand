import axios from "src/services";

const orderAPI = {
  createOrder: (params) => {
    const url = "/orders/new-order";
    return axios.post(url, params);
  },
  cancelOrder: (userId, orderId) => {
    const url = `/accounts/${userId}/orders/${orderId}`;
    return axios.delete(url);
  },
  updateOrder: (orderId, params) => {
    const url = `/orders/${orderId}`;
    return axios.put(url, params);
  },
  getOrders: (params) => {
    const url = "/orders";
    return axios.get(url, { params });
  },
  getOrderDetails: (userId, orderId) => {
    const url = `/accounts/${userId}/orders/${orderId}`;
    return axios.get(url);
  },
};

export default orderAPI;
