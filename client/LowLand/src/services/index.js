import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2818/api",
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    if (response && response.data && response.data.result)
      return response.data.result;
    else return response;
  },
  function (error) {
    throw error.response.data.message;
  }
);

export default instance;
