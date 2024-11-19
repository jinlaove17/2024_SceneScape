import { localAxios } from "@/utils/http-commons";

const boardAPI = localAxios();

const getPosts = (success, fail) => {
  boardAPI.get("/board/posts.do").then(success).catch(fail);
};

const getPost = (postNo, success, fail) => {
  boardAPI.get(`/board/post.do?postNo=${postNo}`).then(success).catch(fail);
};

const createPost = (post, success, fail) => {
  boardAPI.post("/board/createPost.do", post).then(success).catch(fail);
};

const updatePost = (post, success, fail) => {
  boardAPI.post("/board/updatePost.do", post).then(success).catch(fail);
};

const deletePost = (postNo, success, fail) => {
  boardAPI.post("/board/deletePost.do", { postNo }).then(success).catch(fail);
};

const createTempPost = () => {
  return boardAPI.post("/board/createTempPost.do");
};

const uploadImage = (formData) => {
  return boardAPI.post("/image/uploadImage.do", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // 명시적으로 설정
    },
  });
};

export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createTempPost,
  uploadImage,
};
