import axios from "src/services";

const blogAPI = {
  createBlog: (params) => {
    const url = "/blogs";
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default blogAPI;
