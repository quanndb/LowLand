import axios from "src/services";

const authorAPI = {
  getAuthorInfo: (authorId) => {
    const url = `/authors/${authorId}`;
    return axios.get(url);
  },
  getAuthorBlogs: (authorId) => {
    const url = `/authors/${authorId}/blogs`;
    return axios.get(url);
  },
};

export default authorAPI;
