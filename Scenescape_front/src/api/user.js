import { localAxios } from "@/utils/http-commons";

const userAPI = localAxios();

const registerUser = (user, success, fail) => {
  userAPI.post("/user", user).then(success).catch(fail);
};

const loginUser = (user, success, fail) => {
  userAPI.post("/user/login", user).then(success).catch(fail);
};

const logoutUser = (success, fail) => {
  userAPI.post("/user/logout").then(success).catch(fail);
};

const updateUser = (user, success, fail) => {
  userAPI.put("/user", user).then(success).catch(fail);
};

const deleteUser = (userId, success, fail) => {
  userAPI.delete(`/user/${userId}`).then(success).catch(fail);
};

const findPassword = (user, success, fail) => {
  userAPI.post("/user/find-password", user).then(success).catch(fail);
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  findPassword,
};
