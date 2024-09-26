import axios from "src/services";

const blogAPI = {
  getBlogs: (params) => {
    const url = "/blogs";
    return axios.get(url, {
      params,
    });
  },
  getDetails: (blogId) => {
    const url = `/blogs/${blogId}`;
    return axios.get(url);
  },
  createBlog: (params) => {
    const url = "/blogs";
    return axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateBlog: (blogId, params) => {
    const url = `/blogs/${blogId}`;
    return axios.put(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteBlog: (blogId) => {
    const url = `/blogs/${blogId}`;
    return axios.delete(url);
  },
};

export default blogAPI;
