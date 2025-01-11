import getInstance from "../utils/http-commons";

const boardAPI = getInstance();

const getPost = async (postNo) => {
  return await boardAPI.get(`/posts/${postNo}`);
};

const getPostsByFilter = async (filter) => {
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

  console.log("/posts?" + queryParams.toString());
  return await boardAPI.get("/posts?" + queryParams.toString());
};

export { getPost, getPostsByFilter };
