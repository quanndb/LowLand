import axios from "src/services";

const accountAPI = {
  register: (params) => {
    const url = "/accounts/register";
    return axios.post(url, params);
  },
  update: (params) => {
    const url = "/accounts/my-account";
    return axios.post(url, params);
  },
};

export default accountAPI;
