import axios from "src/services";

const accountAPI = {
  getAccounts: (params) => {
    const url = "/accounts";
    return axios.get(url, { params });
  },
  getDetails: (accountId) => {
    const url = `/accounts/${accountId}`;
    return axios.get(url);
  },
  createAccount: (params) => {
    const url = "/accounts";
    return axios.post(url, params);
  },

  updateAccount: (accountId, params) => {
    const url = `/accounts/${accountId}`;
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteAccount: (id) => {
    const url = `/accounts/${id}`;
    return axios.delete(url);
  },
};

export default accountAPI;
