import { localAxios } from "@/utils/http-commons";

const boardAPI = localAxios();

const getPosts = (success, fail) => {
  boardAPI.get("/posts").then(success).catch(fail);
};

const getPost = (postNo, success, fail) => {
  boardAPI.get(`/posts/${postNo}`).then(success).catch(fail);
};

const createPost = (post, success, fail) => {
  boardAPI.post("/posts", post).then(success).catch(fail);
};

const updatePost = (post, success, fail) => {
  boardAPI.put(`/posts/${post.no}`, post).then(success).catch(fail);
};

const deletePost = (postNo, success, fail) => {
  boardAPI.delete(`/posts/${postNo}`).then(success).catch(fail);
};

const createTempPost = () => {
  return boardAPI.post("/posts/temp");
};

const uploadImage = (formData) => {
  return boardAPI.post("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // 명시적으로 설정
    },
  });
};

const likePost = (postNo, userId, likeStatus, success, fail) => {
  boardAPI
    .put(`/posts/like/${postNo}`, { userId: userId, likeStatus })
    .then(success)
    .catch(fail);
};

export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createTempPost,
  uploadImage,
  likePost,
};
