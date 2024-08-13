import logo from "src/components/logo";
import axios from "src/services";

const authAPI = {
  login: (params) => {
    const url = "/auth/login";
    return axios.post(url, params);
  },
  logout: () => {
    const url = "/auth/logout";
    return axios.post(url);
  },
};

export default authAPI;
