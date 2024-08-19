import axios from "src/services";

const accountAPI = {
  update: (accountId, params) => {
    const url = "/accounts/" + accountId;
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default accountAPI;
