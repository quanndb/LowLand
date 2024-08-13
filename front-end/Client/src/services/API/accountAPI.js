import axios from "src/services";

const accountAPI = {
  update: (params) => {
    const url = "/accounts/profile";
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default accountAPI;
