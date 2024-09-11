import axios from "src/services";

const blogAPI = {
  getBlogs: (params) => {
    const url = "/blogs";
    return axios.get(url, { params });
  },
  getDetails: (blogId) => {
    const url = "/blogs/" + blogId;
    return axios.get(url);
  },
};

export default blogAPI;
