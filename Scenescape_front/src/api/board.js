import { localAxios } from "@/utils/http-commons";

const boardAPI = localAxios();

const getPosts = (success, fail) => {
  boardAPI.get("/posts").then(success).catch(fail);
};

const searchByFilter = (filter, success, fail) => {
  const queryParams = new URLSearchParams();

  for (const key in filter) {
    if (filter[key]) {
      if (Array.isArray(filter[key])) {
        filter[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.append(key, filter[key]);
      }
    }
  }

  console.log(queryParams.toString());
  boardAPI
    .get("/posts?" + queryParams.toString())
    .then(success)
    .catch(fail);
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

const likePost = (postNo, likeStatus, success, fail) => {
  boardAPI
    .put(`/posts/like/${postNo}`, { likeStatus })
    .then(success)
    .catch(fail);
};

export default {
  getPosts,
  searchByFilter,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createTempPost,
  uploadImage,
  likePost,
};
