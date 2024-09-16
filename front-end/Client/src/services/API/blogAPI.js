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
  getIsLikedAndTotal(blogId) {
    const url = "/blogs/" + blogId + "/interactions";
    return axios.get(url);
  },
  likeBlog(blogId) {
    const url = "/blogs/" + blogId + "/likes";
    return axios.post(url);
  },
  likeComment(blogId, commentId) {
    const url = "/blogs/" + blogId + "/comments/" + commentId + "/likes";
    return axios.post(url);
  },
  getComments(blogId, params) {
    const url = "/blogs/" + blogId + "/comments";
    return axios.get(url, { params });
  },
  getReplies(blogId, commentId, params) {
    const url = "/blogs/" + blogId + "/comments/" + commentId + "/replies";
    return axios.get(url, { params });
  },
  addComment(blogId, comment) {
    const url = "/blogs/" + blogId + "/comments";
    return axios.post(url, comment);
  },
  addReply(blogId, parentsId, commentId, comment) {
    const url =
      "/blogs/" + blogId + "/comments/" + parentsId + "/replies/" + commentId;
    return axios.post(url, comment);
  },
};

export default blogAPI;
