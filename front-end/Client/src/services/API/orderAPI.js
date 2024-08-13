import axios from "src/services";

const orderAPI = {
  createOrder: (params) => {
    const url = "/orders/new-order";
    return axios.post(url, params);
  },
  cancelOrder: (params) => {
    const url = "/orders/cancel-order";
    return axios.put(url, params);
  },
  updateOrder: (params) => {
    const url = "/orders/my-orders";
    return axios.put(url, params);
  },
  getMyOrders: () => {
    const url = "/orders/my-orders";
    return axios.get(url);
  },
  getOrderDetails: (params) => {
    const url = "/orders/" + params;
    return axios.get(url, params);
  },
};

export default orderAPI;
