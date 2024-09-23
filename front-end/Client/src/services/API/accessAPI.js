import axios from "src/services";

const accessAPI = {
  post: () => {
    const url = "/charts/accessHistories";
    return axios.post(url);
  },
};

export default accessAPI;
