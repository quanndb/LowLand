import axios from "src/services";

const accountAPI = {
  getAlls: () => {
    const url = "/accounts";
    return axios.get(url);
  },
  createAccount: (params) => {
    const url = "/accounts/new-account";
    return axios.post(url, params);
  },
  updateAccount: (params) => {
    const url = `/accounts/edit-account`;
    return axios.post(url, params);
  },
  deleteAccount: (id) => {
    const url = `/accounts/delete-account?accountId=${id}`;
    return axios.post(url);
  },
};

export default accountAPI;
